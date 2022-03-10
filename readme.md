[//]: # (header-start)


<h1 align="center">
	<a href="https://blog.axway.com/mobile-apps/prepare-your-apps-for-appcelerator-end-of-support">
		Preparing for end of Axway
	</a>	
</h1>
<h2 align="center">
	👇 &nbsp; support for Amplify Cloud and Mobile   &nbsp; 👇
</h2>	

<a href="https://brenton.house/saying-goodbye-to-axway-amplify-titanium-31a44f3671de">
	<p align="center">
		<img src="https://cdn.secure-api.org/images/RIP-Axway-Amplify-Titanium.png" alt="RIP Axway Amplify Titanium (2010 - 2022)" width="80%" />
	</p>
</a>	
<p align="center">
	<a href="https://blog.axway.com/mobile-apps/changes-to-application-development-services">
			🪦 &nbsp; RIP Axway Amplify Titanium (2010 - 2022)
	</a>
</p>
<p align="center">
	<a href="https://blog.axway.com/mobile-apps/prepare-your-apps-for-appcelerator-end-of-support">
			🪦 &nbsp; RIP Axway Amplify Cloud Services (2012 - 2022)
	</a>
</p>
<p align="center">
	<a href="https://blog.axway.com/mobile-apps/prepare-your-apps-for-appcelerator-end-of-support">
			🪦 &nbsp; RIP Axway Amplify Crash Analytics (2015 - 2022)
	</a>
</p>

<hr>
<a href="https://blog.axway.com/mobile-apps/prepare-your-apps-for-appcelerator-end-of-support">
	<h4 align="center">
🛑 &nbsp;&nbsp; <a href="https://blog.axway.com/mobile-apps/prepare-your-apps-for-appcelerator-end-of-support">Axway has already shut down support</a> for most of their Amplify products related to mobile and cloud. 
</h4>

<h4 align="center">
A few of the open-source versions of Axway Amplify products will live on after Axway Amplify End-of-Life (EOL) announcements.  However, all closed-source projects and most open-source projects are now dead.  
	</h4>

<p>&nbsp;</p>

> 👉 &nbsp;&nbsp; A group of Axway employees, ex-Axway employees, and some developers from Titanium community have created a legal org and now officially decide all matters related to future of these products.  

<p>&nbsp;</p>
<hr>


## API FAQ:

* [API Best Practices](https://brenton.house)
* [What is API Security?](https://brenton.house/what-is-api-security-5ca8117d4911)
* [OWASP Top 10 List for API Security](https://www.youtube.com/watch?v=GLVHDj0Cpg4)
* [What is API Security?](https://brenton.house/what-is-api-security-5ca8117d4911)
* [Top API Trends for 2022](https://brenton.house/top-10-api-integration-trends-for-2022-49b05f2ef299)
* [What is a Frankenstein API?](https://brenton.house/what-is-a-frankenstein-api-4d6e59fca6)
* [What is a Zombie API?](https://brenton.house/what-is-a-zombie-api-6e5427c39b6a)
* [API Developer Experience](https://brenton.house/keys-to-winning-with-an-awesome-api-developer-experience-62dd2fa668f4)
* [API Cybersecurity 101](https://brenton.house/what-is-api-security-5ca8117d4911)
* [YouTube API Videos](https://youtube.com/brentonhouse)
* [YouTube API Shorts Videos](https://youtube.com/apishorts)

&nbsp;

[![Click to watch on Youtube](https://img.youtube.com/vi/GLVHDj0Cpg4/0.jpg)](https://www.youtube.com/watch?v=GLVHDj0Cpg4&list=PLsy9MwYlG1pew6sktCAIFD5tbrXy9HUQ7  "Click to watch on YouTube")


> &nbsp; [↑ Watch video on YouTube ↑](https://www.youtube.com/watch?v=GLVHDj0Cpg4&list=PLsy9MwYlG1pew6sktCAIFD5tbrXy9HUQ7)

&nbsp;



<p>&nbsp;</p>
<hr>

<p>&nbsp;</p>
<p>&nbsp;</p>

[//]: # (header-end)

# @titanium/eventsource

[![@titanium/eventsource version](https://img.shields.io/npm/v/@titanium/eventsource.png)](https://www.npmjs.com/package/@titanium/eventsource)
[![@titanium/eventsource downloads](https://img.shields.io/npm/dm/@titanium/eventsource.svg)](https://www.npmjs.com/package/@titanium/eventsource)
[![@titanium/eventsource dependencies](https://img.shields.io/librariesio/release/npm/@titanium/eventsource.svg)](https://www.npmjs.com/package/@titanium/eventsource)


> Implementation of EventSource for Axway Amplify Titanium Native mobile apps

* [API FAQ:](#api-faq)
* [📝 Description](#-description)
* [🚀 Getting Started](#-getting-started)
* [🔗 Related Links](#-related-links)
* [📚 Learn More](#-learn-more)
* [📣 Feedback](#-feedback)
* [©️ Legal](#️-legal)

## 📝 Description

Server-Sent Event (SSE) streaming communication requires an implementation of EventSource and currently, no other EventSource polyfill exists for Titanium Native mobile apps.  This package was written to be fully spec compliant:  https://html.spec.whatwg.org/multipage/server-sent-events.html  More features may be added to this client but goal is to keep it compliant.

Titanium EventSource is based on [EventSource Polyfill](https://github.com/mattkrick/event-source-polyfill) by [Matt Krick](https://github.com/mattkrick).


## 🚀 Getting Started

> This module is meant to be used with Axway Amplify Titanium Native mobile apps
 
There are several ways this module can be used by Axway Amplify Titanium.  It is likely that the package or library you are using for SSE already has this package as a dependency, in which case, you do not need to do anything further.

> Please ensure there is a package.json file in the target directory.  If there is not one present, you can create one with `npm init`.


If you are building an SSE module yourself and wish to use Titanium EventSource or you wish to install this in an app using Titanium Turbo, you can execute this in the project root directory:

```bash
npm install @titanium/eventsource
```

If you wish to install this in a Titanium Alloy app, you an install this by executing the following in the project root directory:

```bash

cd app
npm install @titanium/eventsource

```

## 🔗 Related Links

⭐  [Titanium Mobile](https://www.npmjs.com/package/titanium) - Open-source tool for building powerful, cross-platform native apps with JavaScript.   
⭐  [Titanium Alloy](https://www.npmjs.com/package/alloy) - MVC framework built on top of Titanium Mobile.   
⭐  [Appcelerator](https://www.npmjs.com/package/appcelerator) - Installer for the Appcelerator Platform tool   
⭐  [Titanium Turbo](https://www.npmjs.com/package/@titanium/turbo) - Variation of **`Titanium Alloy`** that adds some enhancements and customizations for rapid development.     
⭐  [Geek Mobile Toolkit](https://www.npmjs.com/package/@geek/mobile) - Toolkit for creating, building, and managing mobile app projects.   


## 📚 Learn More

⭐  [Axway Developer Portal](https://developer.axway.com)    
⭐  [Axway Developer Blog](https://devblog.axway.com)    

## 📣 Feedback

Have an idea or a comment?  [Join in the conversation here](https://github.com/brentonhouse/titanium-eventsource)! 

## ©️ Legal

Alloy is developed by Appcelerator and the community and is Copyright © 2012-Present by Appcelerator, Inc. All Rights Reserved.

Alloy is made available under the Apache Public License, version 2. See their license file for more information.

Appcelerator is a registered trademark of Appcelerator, Inc. Titanium is a registered trademark of Appcelerator, Inc. Please see the LEGAL information about using trademarks, privacy policy, terms of usage and other legal information at http://www.appcelerator.com/legal.