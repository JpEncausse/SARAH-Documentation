# FAQ / How To

If you don't find an answer
- Look into FAQ of dedicated version de SARAH [v3](faq_v3) ou [v4](faq_v4)
- Ask on the [Google+ Community](http://community.sarah.encausse.net).

## Table of Content

## SARAH Project

### Why SARAH ?

- The project ahs been created in 2012 form an idea of 2007
- The name comes from [Eureka TV Series](http://www.syfy.com/eureka/). 
- S.A.R.A.H. means _Self Actuated Residential Automated Habitat_ and this name comes from TV Show _Eureka_.
- Goals was learning NodeJS, C# also:
  - Computer Vision
  - Kinect
  - Internet of Things
  - Community Managment

SARAH is exepensive and takes times be patient !

### OpenSource Project ?

I use to share my ideas throught [articles](http://encausse.net) and [code](https://github.com/JpEncausse), if it could help...

Sources are on GitHub under [WFTPL](fr.wikipedia.org/wiki/WTFPL).
- The [Documentation](https://github.com/JpEncausse/SARAH-Documentation)
- SARAH v3 [Client](https://github.com/JpEncausse/WSRMacro) et [Server](https://github.com/JpEncausse/WSRNodeJS) 
- SARAH v4 [Client](https://github.com/JpEncausse/SARAH-Client-Windows) et [Server](https://github.com/JpEncausse/SARAH-Server-NodeJS)

The project is structured around community plugins. I do note take pull request I don't have time.

### A Framework not a Product ?

SARAH is not a product, I don't have enought time. It's a framework to think the future now.

### What about commercial usage ?

The license is [WFTPL](fr.wikipedia.org/wiki/WTFPL). 
But it's dangerous to do business on top of someone alone side project.

### How to help SARAH ?

SARAH was one of the first smart home project.

* Talk on Social Networks and Blogs about SARAH
* Show SARAH to friends
* Build new plugins

You want to contribute to this documentation? [Go to the Github.dll repository](https://github.com/JpEncausse/SARAH-Documentation/tree/gh-pages).
* Translation help would be great !

Company can send me product sample to do PoC of plugin.

### Which languages does SARAH speak?

SARAH support several languages but right now we are only focused on **English** and **French**.
However SARAH will only work with one language at a time that is defined in the `custom.ini` file.

The default language for SARAH is French, so make sure you follow the [installation guide](#getting_started) to install the language pack.

So far almost all the plugins are in French only.


## HardWare

### What are compatible things ?

- There is a [marketplace](/home?page=marketplace) of 200 plugins.
- Any API should be compatible with SARAH easily.

### What are the requirements?

The **Operating System** must be **Windows** (Windows 7, 8, 8.1 in 32 or 64bit), but it should also work with a Windows Virtual Machine over Linux and MacOS.

You must have a microphone, or a **Kinect**. The Kinect works much better for voice recognition, and also provides more features (gesture, face recognition, QRCode, ...).
If you want to use SARAH with a Kinect, please read that before:
* Kinect v1 for XBox 360
  * Very cheap (~40€)
  * MUST have the USB wire and the power supply
  * According to licence: for developer only (so SARAH)
* Kinect v1 for Windows
  * More expensive
* Kinect v2 for Windows
  * About 200€
  * Need to be installed under **Windows 8.1** and need to use an **USB 3**

And finally you'll need to have an Internet connection.

Regarding the hardware to run SARAH, the program can be really laggy on a weak processor.


### Which microphone ? Kinect 1 ? Kinect 2 ?

_to do_

### Can I use multiple microphone ?

_to do_

### Can I use multiple speaker ?

_to do_

### How to do the multi-room ?

You can use Mumble to enable SARAH in several rooms. There is video tutorial in French about it: [http://youtu.be/-lJT_I68Qk4](http://youtu.be/-lJT_I68Qk4).

### Is there a mobile app for SARAH ?

* For [Android](https://play.google.com/store/apps/details?id=net.android.clientsarah).
* There is an iOS app on the community
* There is a Windows Phone app in beta on the community


## Installation

If it does not work look at the logs of the client or the server. The issue is often related to a file path, an occupied port or a software using the same resources

### I have error EADDRINUSE

The error EADDRINUSE means "Error Address already In Use". The server Port 8080 (or 8888 for client) is already used by an other process. It could be SARAH server itself if it has not be closed correctly.

Use NetStat DOS command to list port in use.

### I have an error with 'KinectAudio10.dll'

If Log2Console gives you the error `Init Kinect Engines: unable to load 'KinectAudio10.dll'` then it's certainly because you have installer a [N version of Windows](http://windows.microsoft.com/en-us/windows-8/upgrade-to-n).
To fix that, just install a *Media Feature Pack*.

For example for Windows 10: [Media Feature Pack for versions N and KN of Windows 10](https://www.microsoft.com/fr-FR/download/details.aspx?id=48231) (for Windows before November 2015), or [Media Feature Pack for versions N and KN of Windows 10 #2](https://www.microsoft.com/en-US/download/details.aspx?id=49919) (for Windows updated after November 2015), or [Media Feature Pack for version N and KN of Windows 10 #3](https://www.microsoft.com/en-us/download/details.aspx?id=53356) (for Windows updated after August 1st, 2016).

### How to change the voice ?

_to do_

### How to delete my speech recognition profile?

It's not good to do the speech recognition too many times. So you can try deleting your Windows "speech recognition profile" if SARAH doesn't understand you correctly anymore.  
Go to `Control Panel` ➜ `Speech Recognition` ➜ `Advanced speech options` ➜ `Recognition Profiles` ➜ `Delete...`


## Software

### The server display an error

If there is an error message in the server window saying `module not found` then it means there is an error with the plugin (either with the JavaScript `.js` file or the `.prop` file). Try to contact the plugin developer.

### SARAH is deaf

A plugin MUST call a callback `next()` or `callback()` to indicate to the client the job is finished otherwise the client wait minutes until a timeout.

SARAH do not listen while speaking. If client crash she becomes deaf. Look and Send me the client logs.

### Plugin fails the installation

Sometimes plugins installation fails. It should be downloaded in `/tmp` folder (otherwise ask the community).  

Try again or unzip manually the plugin.




