# Getting Started

SARAH v4 is still under developpement. Client and Server has been rewritten to improve modularity.

Please refer to [SARAH v3](getting_started_v3) if you want to test the stable version.

## Table of Content

## Installation

There is some explanation in the README folder of SARAH.

### Windows

On a regular windows some steps are already done. Below the different steps:

1. Download and Unzip [SARAH](http://sarah.encausse.net)   
  ➔ When you unzip the SARAH package, you have to make sure to **not have any space within the path.** For example you can unzip to `C:\SARAH\` but not to `C:\Path with space\SARAH\`

2. (by default) Download and install [.Net 4.5 Framework](http://www.microsoft.com/fr-fr/download/details.aspx?id=30653)

3. (by default) Download and install x86 version of [Microsoft Speech Platform 11](http://www.microsoft.com/en-us/download/details.aspx?id=27225)   
   ➔ Also install language engine [Microsoft Speech Platform - Languages 11](http://www.microsoft.com/en-us/download/details.aspx?id=27224)

After these steps SARAH is ready [to be configured](#configuration). **If you have a Kinect**, please [see below the instructions](#kinect-v1) to make it work.

4. Some people have an error: "Missing MSVCR110.dll" you should install [VisualStudio Update 4](http://www.microsoft.com/fr-fr/download/details.aspx?id=30679) (I don't know why ...)

### Kinect v1

1. (by default) Download and install [Microsoft Kinect SDK 1.8](http://www.microsoft.com/en-us/download/details.aspx?id=40278)   
   ➔ Also install language engine [Kinect for Windows Language pack v11](http://www.microsoft.com/en-us/download/details.aspx?id=34809)

2. (optional) Install [Kinect Developper Toolkit 1.8](http://www.microsoft.com/en-sg/download/details.aspx?id=40276) pour jouer avec les exemples

3. In `client/custom.ini`

```
[kinect_v1]
enable=true

[microphone]
enable=false
```

Otherwise the Kinect is considered as a microphone. At the moment you can't use both Kinect 1 and Kinect 2.

### Kinect v2

1. (by default) Download and install [Microsoft Kinect SDK 2.0](http://www.microsoft.com/en-us/download/details.aspx?id=44561)   
   ➔ Also install language engine [Kinect for Windows SDK 2.0 Language Packs](http://www.microsoft.com/en-us/download/details.aspx?id=43662)

2. (optional) Install [Kinect Developper Toolkit 1.8](http://www.microsoft.com/en-sg/download/details.aspx?id=40276) pour jouer avec les exemples

3. In `client/custom.ini`

```
[kinect_v2]
enable=true

[microphone]
enable=false
```

Otherwise the Kinect is considered as a microphone. At the moment you can't use both Kinect 1 and Kinect 2.

### Linux (server)

The SARAH server can be installed on a Linux. The `plugin` must be duplicated or shared because XML are on client and JS on server.
Configuration of Client and Server must be updated according to their address.

```
git clone https://github.com/JpEncausse/SARAH-Server-NodeJS.git
cd SARAH-Server-NodeJS/server/app
npm install
mkdir data
cp server/server.prop data/custom.prop
```

Then to run the server
```
export NODE_PATH=$PWD/server/app/node_modules
sudo -E node server/app/app.js
```

## Démarrer

Follow the below two steps to start SARAH:

1. **Run the server**: double-click the file called `Start_Server.cmd`       
  ➔ a MS-DOS window will open with several lines  
  ➔ you can open [http://127.0.0.1:8080](http://127.0.0.1:8080) into your Web browser to check the web interface

2. **Run the client** double-click the file called `Start_Server.cmd`  
  ➔ Once the client is loaded you'll see a small house icon close to the Windows clock.

All done! You can now say __"SARAH what time is it?"__. And to have more fun you can install a plugin (see below).

If you have any troubles, please refer to the [FAQ page](faq).




## Configuration

### Voice Recognition

In order to have some good results with SARAH you need to use a good microphone. Here is [an article (in French)](http://encausse.wordpress.com/2013/05/19/thevoice/) where testing Microhpone, Kinect and VoiceTracker II with SARAH.

Find below the next steps:

- Put microphone in front of your head with other audio source aside or behind
- Set the income sound volume : go to ➔ `Control Panel` ➔  `Sound` ➔  `Right click on your microphone` ➔  Click on `Properties` ➔  Change the `levels` (for a simple microphone don't go too high ~80, and for Kinect, just try different settings)
- Train your voice in Windows : go to ➔  `Control Panel` ➔  `Speech Recognition` ➔   `Train your computer to better understand you` (attention: with a simple microphone, do this training only once)

### Voice Synthesis

SARAH use 32bit SAPI Windows Voice.

You can [install a TTS Voice](http://encausse.wordpress.com/2013/05/23/sarah-joshua-jarvis-yuri-et-les-autres/) or use the default Windows 8 voice
   
  ➔ [Voxygen](http://voxygen.fr) provide good voices (talk to them about SARAH !)       
  ➔ If you have any issues with the voices, please see [FAQ](faq)

To select select a voice go to 32bit UI (not 64bit): `%windir%\SysWOW64\speech\SpeechUX\sapi.cpl`


### Get the Google API Key

SARAH understant commands. It can't understand open question: "SARAH search * on Wikipedia". A workaround is to use Google Speech API. You'll need this Google API Key for several plugins.

Please follow the below steps to get this API key (instructions from [http://www.chromium.org/developers/how-tos/api-keys](http://www.chromium.org/developers/how-tos/api-keys))

```block-tabs

#### 1) Register on Chromium 

Register on Chromium Google Groups:

* Make sure you are a member of chromium-dev@chromium.org (you can just subscribe to chromium-dev and choose to not receive e-mails). For convenience, the APIs below are only visible to people subscribed to that group: [https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev](https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev)
* Click on « _Join the group to send a message_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_1.png)

* Choose « _Do not send updates by email_ »
* Click on « _Join the group_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_2.png)

#### 2) Create a Google App

Create a console app on Google

* Go to [https://cloud.google.com/console](https://cloud.google.com/console)
* Click on « _Create Project_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_3.png)

* Give it a name
* Accept the Terms of Use
* Click on « _Create_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_4.png)

#### 3) Activate Speech API

* Go to « _APIs & Auth > APIs_ » in the left navigation menu
* In **Browse API** search for « _Speech API_ »
* Click on « _Speech API_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_5.png)

* Activate the key

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_6.png)

* Accept the terms of use

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_7.png)

#### 4) Create Speech Key

Creating your key « Speech API »

* Go to « _APIs & Auth > Credentials_ » in the left navigation menu
* Click on the « _Create New Key_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_8.png)

* Click on « _Browser key_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_9.png)

* Click on « _Create_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_10.png)

* Your API key:

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_11.png)

#### 5) Connect SARAH

* Open the SARAH configuration file (`client/custom.ini`)
* Search for the line `; Google Speech API Key (retrieve from Google Console)`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_12.png)

* Change the line `;key=` :
  + remove the `;`
  + add your API key just after the `=`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_13.png)

Note: the key you have now acquired are **not for distribution purposes and must not be shared with other users**. 

```
