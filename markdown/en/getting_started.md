# Wiki of S.A.R.A.H.

The Framework [S.A.R.A.H.](http://encausse.net/s-a-r-a-h) is an Home Automation project to connect Internet of Things and bring SciFi to House like TV Show: Eureka.

**Getting Involved ?**
* To contribute on this Wiki Send an email to <sarah.project@encausse.net>
* Talk about S.A.R.A.H. every where
* Make new [cool plugins](http://marketplace.sarah.encausse.net/store)
* Have fun !


## Getting Started

* [Installation and Upgrade](https://github.com/JpEncausse/SARAH-Documentation/wiki/Installation)
* [Microphone](https://github.com/JpEncausse/SARAH-Documentation/wiki/Microphone)
* [Voice TTS](https://github.com/JpEncausse/SARAH-Documentation/wiki/Voice-TTS)
* [AppStore & Plugins] (https://github.com/JpEncausse/SARAH-Documentation/wiki/AppStore & Plugins)
* [Frequently asked questions](https://github.com/JpEncausse/SARAH-Documentation/wiki/FAQ)

## Technical details

* [Requirement](https://github.com/JpEncausse/SARAH-Documentation/wiki/Requirement)
* [Architecture](https://github.com/JpEncausse/SARAH-Documentation/wiki/Architecture)
    * [Client components](https://github.com/JpEncausse/SARAH-Documentation/wiki/Architecture#wsrkinect---wsrmicro-client)
    * [Server components](https://github.com/JpEncausse/SARAH-Documentation/wiki/Architecture#wsrnodejs-server)
    * [Splitting Client vs Server](https://github.com/JpEncausse/SARAH-Documentation/wiki/Client---Server)
* WSRCamera



## Core API

Several plugins are already available (thanks to the community). They can be built using XML (Client API) and JavaScript (Server API).

### Server API (NodeJS)

* [GitHub Repository](https://github.com/JpEncausse/WSRNodeJS)
* [Plugin Architecture](https://github.com/JpEncausse/SARAH-Documentation/wiki/Plugin-Architecture)
   * [Properties](https://github.com/JpEncausse/SARAH-Documentation/wiki/Plugin-Architecture#properties)
   * [Plugin](https://github.com/JpEncausse/SARAH-Documentation/wiki/Plugin-Architecture#javascript)
      * [PhantomJS](https://github.com/JpEncausse/SARAH-Documentation/wiki/Plugin-Architecture#phantomjs)
      * [CRON](https://github.com/JpEncausse/SARAH-Documentation/wiki/Plugin-Architecture#cron)
   * [JavaScript API](https://github.com/JpEncausse/SARAH-Documentation/wiki/JavaScript-API)
      * [Context](https://github.com/JpEncausse/SARAH-Documentation/wiki/JavaScript-API#wiki-context)
      * [Event](https://github.com/JpEncausse/SARAH-Documentation/wiki/JavaScript-API#wiki-event)
      * [AskMe](https://github.com/JpEncausse/SARAH-Documentation/wiki/JavaScript-API#wiki-askme)
      * [Chromeless](https://github.com/JpEncausse/SARAH-Documentation/wiki/JavaScript-API#wiki-chromeless)
* [HTTP Server](https://github.com/JpEncausse/SARAH-Documentation/wiki/HTTP-Server)
   * [Documentation](https://github.com/JpEncausse/SARAH-Documentation/wiki/HTTP-Server#documentation)
   * [Portlets](https://github.com/JpEncausse/SARAH-Documentation/wiki/HTTP-Server#portlets)
   * [ThirdParty page](https://github.com/JpEncausse/SARAH-Documentation/wiki/HTTP-Server#thirdparty-page)
* [Rules Engine] (https://github.com/JpEncausse/SARAH-Documentation/wiki/Rules-Engine)
* [How To](https://github.com/JpEncausse/SARAH-Documentation/wiki/How-To)
   * [Sending an HTTP Request](https://github.com/JpEncausse/SARAH-Documentation/wiki/How-To#wiki-sending-an-http-request)
   * [Scraping with Cheerio or PhantomJS](https://github.com/JpEncausse/SARAH-Documentation/wiki/How-To#wiki-scraping-with-cheerio-or-phantomjs)
   * Rewriting grammar
   * Scheduling actions

### Client API (C#)

* [GitHub Repository](https://github.com/JpEncausse/WSRMacro)
* [Voice Recognition](https://github.com/JpEncausse/SARAH-Documentation/wiki/Voice-Recognition)
    * [RTP Server](https://github.com/JpEncausse/SARAH-Documentation/wiki/Voice-Recognition#rtp-server)
    * [File Watcher](https://github.com/JpEncausse/SARAH-Documentation/wiki/Voice-Recognition#file-watcher)
* [Kinect](https://github.com/JpEncausse/SARAH-Documentation/wiki/Kinect-API)
    * [Motion Detection](https://github.com/JpEncausse/SARAH-Documentation/wiki/Kinect-API#motion-detection-depth)
    * [Color Management](https://github.com/JpEncausse/SARAH-Documentation/wiki/Kinect-API#color-management)
    * [QRCode Recognition](https://github.com/JpEncausse/SARAH-Documentation/wiki/Kinect-API#qrcode-recognition)
    * [Gesture Recognition](https://github.com/JpEncausse/SARAH-Documentation/wiki/Kinect-API#gesture-recognition)
    * [Facial Recognition](https://github.com/JpEncausse/SARAH-Documentation/wiki/Kinect-API#facial-recognition)
* ProfileManager
* [WebSocket Server](https://github.com/JpEncausse/SARAH-Documentation/wiki/WebSocket-Server)
* [HTTP Manager](https://github.com/JpEncausse/SARAH-Documentation/wiki/HTTP-Manager)
    * [HTTP Client](https://github.com/JpEncausse/SARAH-Documentation/wiki/HTTP-Manager#http-client)
    * [HTTP Server](https://github.com/JpEncausse/SARAH-Documentation/wiki/HTTP-Manager#http-server)
* [Speaker Manager](https://github.com/JpEncausse/SARAH-Documentation/wiki/Speaker-Manager)


## 3rd Party

### Tools

* [XMLDoc lib](https://github.com/JpEncausse/SARAH-Documentation/wiki/Parsing-XML-file-with-XMLDoc-lib)
* [NFC Watcher](http://encausse.wordpress.com/2013/03/21/le-nfc-pour-piloter-s-a-r-a-h/)
* [Speech2DropVox](http://encausse.wordpress.com/speech2dropbox/)
* [SARAH Tools](https://plus.google.com/u/0/104777719430841651332/posts/eHEQ1zbUQNT)

### Android

[Android Client](https://play.google.com/store/apps/details?id=net.android.clientsarah) : this is used to transmit the vocal commands to SARAH (the [Kinect SDK 1.8](http://download.microsoft.com/download/E/1/D/E1DEC243-0389-4A23-87BF-F47DE869FC1A/KinectSDK-v1.8-Setup.exe) is required) ([GitHub repository](https://github.com/BaptisteMarienval/SARAH-Android/tree/master/build))


### Raspberry-Pi

It's possible to use a Raspberry-Pi with SARAH (_to be completed_) :
* [Debian package](https://plus.google.com/u/0/105669881291779438138/posts/HQ17tsiuyx3) (with NodeJS v0.10.17, the NodeJS part of SARAH v2.9, and the init scripts)
* A [Bash script](https://plus.google.com/u/0/116884866340807817142/posts/3ek5RqfNWib) to download and install the different files for SARAH


### Communities

* [Live TV on XBMC](https://plus.google.com/104956586053309334473/posts/NkCax4Pvqk7)
* [YURI](http://blog.idleman.fr/?p=1788) (embeded SARAH v1.x)


### Specifications (WIP)

Specifications and Work In Progress about future features

* [SARAH-MarketPlace](https://github.com/JpEncausse/SARAH-Documentation/wiki/SARAH-MarketPlace)


