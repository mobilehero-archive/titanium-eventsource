class EventSource extends EventTarget {
	constructor(url, config = {}) {
		console.debug('EventSource.constructor: Entering');
		super();
		this.CONNECTING = 0;
		this.OPEN = 1;
		this.CLOSED = 2;
		this.lastEventId = '';
		this.reconnectionTime = 1000;
		this.responseTextCursor = 0;
		this.eventTypeBuffer = '';
		this.idBuffer = '';
		this.dataBuffer = '';
		this.canReconnect = true;
		this.url = url;
		this.withCredentials = Boolean(config.withCredentials);
		this.timeout = config.timeout || 50000;
		this.addEventListener('error', e => {
			if (this.onerror) {
				this.onerror(e);
			}
		});
		this.addEventListener('message', e => {
			if (this.onmessage) {
				this.onmessage(e);
			}
		});
		this.addEventListener('open', e => {
			if (this.onopen) {
				this.onopen(e);
			}
		});
		this.connect();
	}
	announceConnection() {
		this.readyState = this.OPEN;
		this.dispatchEvent(new MessageEvent('open'));
		this.responseTextCursor = 0;
	}
	connect(url = this.url) {
		this.readyState = this.CONNECTING;
		console.debug('EventSource.connect: creating new HTTPClient');
		const xhr = (this.xhr = Ti.Network.createHTTPClient());
		xhr.open('GET', url, true);
		xhr.timeout = this.timeout;
		xhr.withCredentials = this.withCredentials;
		xhr.setRequestHeader('Accept', 'text/event-stream');
		xhr.setRequestHeader('Cache-Control', 'no-cache');
		if (this.lastEventId) {
			xhr.setRequestHeader('Last-Event-ID', this.lastEventId);
		}
		xhr.onreadystatechange = () => {
			if (xhr.readyState <= 1 || this.readyState === this.CLOSED) {
				return;
			}
			if (xhr.readyState === 4) {
				this.reestablishConnection();
				return;
			}
			switch (xhr.status) {
				case 200:
					// This is now handled by xhr.ondatastream
					break;
				case 204:
					this.canReconnect = false;
					break;
				case 301:
				case 307:
					const redirectUrl = xhr.getResponseHeader('Location');
					this.failConnection(xhr, true);
					if (redirectUrl) {
						this.connect(redirectUrl);
					}
					break;
				default:
					this.failConnection(xhr);
			}
		};
		xhr.ondatastream = () => {
			this.handleConnection(xhr);
			this.interpretStream(xhr);
		};
		xhr.send();
	}
	dispatchMessageEvent(origin) {
		this.lastEventId = this.idBuffer;
		if (this.dataBuffer === '') {
			this.eventTypeBuffer = '';
			return;
		}
		if (this.dataBuffer[this.dataBuffer.length - 1] === '\n') {
			this.dataBuffer = this.dataBuffer.slice(0, -1);
		}
		const eventType = this.eventTypeBuffer || 'message';
		const event = new MessageEvent(eventType, this.dataBuffer, origin, this.lastEventId);
		this.eventTypeBuffer = '';
		this.dataBuffer = '';
		this.dispatchEvent(event);
	}
	handleConnection(xhr) {
		if (this.readyState === this.CONNECTING) {
			const contentType = (xhr.getResponseHeader('Content-Type') || '').toLowerCase();

			console.error(`contentType: ${JSON.stringify(contentType, null, 2)}`);
			if (contentType.split(';')[0] === 'text/event-stream') {
				this.announceConnection();
			} else {
				this.failConnection(xhr);
			}
		}
	}
	failConnection(xhr, isSilent = false) {
		this.readyState = this.CLOSED;
		if (!isSilent) {
			this.dispatchEvent(new MessageEvent('error'));
		}
		this.canReconnect = false;
		xhr.abort();
	}
	interpretStream(xhr) {
		if (this.readyState !== this.OPEN) {
			return;
		}
		let responseText = '';
		try {
			({ responseText } = xhr);
		} catch (_a) {
			return;
		}
		const rawChunk = responseText.substring(this.responseTextCursor);
		this.responseTextCursor = responseText.length;
		const chunk = normalizeToLF(decodeUTF8(rawChunk));
		const lines = chunk.split('\n');
		for (let ii = 0; ii < lines.length; ii++) {
			const line = lines[ii];
			if (line === '') {
				this.dispatchMessageEvent(xhr.responseURL);
			} else {
				const firstColonIdx = line.indexOf(':');
				if (firstColonIdx > 0) {
					const field = line.substring(0, firstColonIdx);
					const untrimmedVal = line.substring(firstColonIdx + 1);
					const value = untrimmedVal.indexOf(' ') === 0 ? untrimmedVal.slice(1) : untrimmedVal;
					this.processField({ field, value });
				} else if (firstColonIdx < 0) {
					this.processField({ field: line, value: '' });
				}
			}
		}
	}
	processField(payload) {
		switch (payload.field) {
			case Fields.EVENT:
				this.eventTypeBuffer = payload.value;
				break;
			case Fields.DATA:
				this.dataBuffer += `${payload.value}\n`;
				break;
			case Fields.ID:
				if (payload.value.indexOf('\u0000') === -1) {
					this.idBuffer = payload.value;
				}
				break;
			case Fields.RETRY:
				const interval = +payload.value;
				if (Number.isInteger(interval)) {
					this.reconnectionTime = interval;
				}
				break;
			default:
				console.warn(`processField: Unknown payload.field = ${payload.field}`);
		}
	}
	reestablishConnection() {
		if (this.readyState === this.CLOSED || !this.canReconnect) {
			return;
		}
		this.readyState = this.CONNECTING;
		this.dispatchEvent(new MessageEvent('error'));
		setTimeout(() => {
			if (this.readyState !== this.CONNECTING) {
				return;
			}
			this.connect();
		}, this.reconnectionTime);
	}
	close() {
		this.readyState = this.CLOSED;
		this.xhr && this.xhr.abort();
	}
}
export default EventSource;
module.exports = EventSource;

class MessageEvent {
	constructor(type, data, origin, lastEventId) {
		this.bubbles = false;
		this.cancelBubble = false;
		this.cancelable = false;
		this.data = data || null;
		this.origin = origin || '';
		this.lastEventId = lastEventId || '';
		this.type = type || 'message';
	}
}

class EventTarget {
	constructor() {
		this.listeners = {};
	}
	addEventListener(type, callback) {
		if (!(type in this.listeners)) {
			this.listeners[type] = [];
		}
		this.listeners[type].push(callback);
	}
	removeEventListener(type, callback) {
		if (!(type in this.listeners)) {
			return;
		}
		const stack = this.listeners[type];
		for (let i = 0, l = stack.length; i < l; i++) {
			if (stack[i] === callback) {
				stack.splice(i, 1);
				return;
			}
		}
	}
	dispatchEvent(event) {
		if (!(event.type in this.listeners)) {
			return true;
		}
		const stack = this.listeners[event.type].slice();
		for (let i = 0, l = stack.length; i < l; i++) {
			stack[i].call(this, event);
		}
		return !event.defaultPrevented;
	}
}

const Fields = {
	EVENT: 'event',
	DATA:  'data',
	ID:    'id',
	RETRY: 'retry',
};
const decodeUTF8 = str => decodeURIComponent(escape(str));
const normalizeToLF = str => str.replace(/\r\n|\r/g, '\n');
