# Getting Started

This page is for **SARAH v3** only. Please refer to [SARAH v4](sarah_v4) if you want to test the new version.

## Index

* [Installation](#installation)
  + [Windows](#windows)
  + [Kinect v1](#kinect-v1)
  + [Kinect v2](#kinect-v2)
* [Configuration](#configuration)
  + [Get the Google API Key](#get-the-google-api-key)
  + [config.ini](#config.ini)
* [Start](#start)
* [Plugins](#plugins)
  + [Installation](#installation)
  + [Plugins Configuration](#plugins-configuration)
  + [Documentation](#documentation)
* [Update SARAH](#update-sarah)

## Installation

### Windows

Below the different steps:

1. Download and install [.Net 4.5 Framework](http://www.microsoft.com/fr-fr/download/details.aspx?id=30653)

2. Download and Unzip [SARAH](http://encausse.net/s-a-r-a-h/)   
  ➔ When you unzip the SARAH package, you have to make sure to **not have any space within the path.** For example you can unzip to `C:\SARAH\` but not to `C:\Path with space\SARAH\`

3. (optional) [Install a TTS Voice](http://encausse.wordpress.com/2013/05/23/sarah-joshua-jarvis-yuri-et-les-autres/) or use the default Windows 8 voice      
  ➔ If you have any issues with the voices, please see [FAQ](faq)

4. If you have a **Kinect**, please [see below the instructions](#kinect-v1) to make it work.

After these steps SARAH is ready [to be configured](#configuration).

### Kinect v1

The Kinect is provided with the Xbox 360 or can be bought separately. This device is very powerful and much better than a regular microphone. If you buy one, then **make sure it comes with the USB cable/adaptator** to plug it to your Windows computer.

Here are the instructions to install it on Windows:

1. Download and install [Kinect SDK v1.8](http://www.microsoft.com/en-us/download/confirmation.aspx?id=40278)
2. Download and install the related [Language Pack](http://www.microsoft.com/en-us/download/details.aspx?id=34809) (make sure you choose the correct language when downloading)

Some notes regarding the Kinect installation:
* Don't use USB 3 because the microphone won't work;
* If you use several Kinects and you want to use the video, then you have to use two different USB bus, otherwise only one video will work due to a bandwidth issue (so if you only use the audio, then you can share the same USB).
* Put Kinect in direct line with the users. 
* Put sound or music sources behind the Kinect.
* User must speak 20db above sound. 

### Kinect v2

Here are the instructions to install the second generation of Kinect:

1. Download and install the [Kinect SDK v2](http://www.microsoft.com/en-us/download/details.aspx?id=44561)
2. Download and install the [language packs v2](http://www.microsoft.com/en-us/download/details.aspx?id=43662) (make sure you choose the correct language)

## Configuration

In order to have some good results with SARAH you need to use a good microphone. Here is [an article (in French)](http://encausse.wordpress.com/2013/05/19/thevoice/) where testing Microhpone, Kinect and VoiceTracker II with SARAH.

Find below the next steps:

1. Go to the `profile/` folder and delete the file `profile.json` otherwise SARAH will sometimes call you _Jean-Philippe_ !
2. Get the Google API Key ([see below](#get-the-google-api-key))
3. Look at the different settings into the `config.ini` file
4. Set the income sound volume : go to ➔ `Control Panel` ➔  `Sound` ➔  `Right click on your microphone` ➔  Click on `Properties` ➔  Change the `levels` (for a simple microphone don't go too high ~80, and for Kinect, just try different settings)
5. Train your voice in Windows : go to ➔  `Control Panel` ➔  `Speech Recognition` ➔   `Train your computer to better understand you` (attention: with a simple microphone, do this training only once)

### Get the Google API Key

You'll need this Google API Key for several plugins.

Please follow the below steps to get this API key (instructions from [http://www.chromium.org/developers/how-tos/api-keys](http://www.chromium.org/developers/how-tos/api-keys))

**1) Register on chromium Google Group :**

* Make sure you are a member of chromium-dev@chromium.org (you can just subscribe to chromium-dev and choose to not receive e-mails). For convenience, the APIs below are only visible to people subscribed to that group: [https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev](https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev)
* Click on « _Join the group to send a message_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_1.png)

* Choose « _Do not send updates by email_ »
* Click on « _Join the group_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_2.png)

**2) Create a console app on Google**

* Go to [https://cloud.google.com/console](https://cloud.google.com/console)
* Click on « _Create Project_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_3.png)

* Give it a name
* Accept the Terms of Use
* Click on « _Create_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_4.png)

**3) Activation Speech API**

* Go to « _APIs & Auth > APIs_ » in the left navigation menu
* In **Browse API** search for « _Speech API_ »
* Click on « _Speech API_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_5.png)

* Activate the key

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_6.png)

* Accept the terms of use

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_7.png)

**5) Creating your key « Speech API »**

* Go to « _APIs & Auth > Credentials_ » in the left navigation menu
* Click on the « _Create New Key_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_8.png)

* Click on « _Browser key_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_9.png)

* Click on « _Create_ » button

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_10.png)

* Your API key:

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_11.png)

**6) SARAH integration**

* Open the SARAH configuration file (`custom.ini`) located in the root dir of SARAH
* Search for the line `Google Speech Key API see https://console.developers.google.com/`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_12.png)

* Change the line `;google=` :
  + remove the `;`
  + add your API key just after the `=`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_13.png)

Note: the key you have now acquired are **not for distribution purposes and must not be shared with other users**. 

### config.ini

All the parameters to configure SARAH are in the `config.ini` file.

We'll list below some of them.

#### SARAH

```
; Hot replace SARAH name
; in the XML (voice recognition) files we use the keyword SARAH
;   however we might want to change the default name to something else, like JARVIS
;   so the XML files we'll keep SARAH, and in the config.ini you just need to change
;   the below SARAH to JARVIS and it will work
name=SARAH

; Speech engine language
; The default language to use ... for English that should be "en-US"
language=fr-FR

; Restart engine every X millisecond (1000 x 60 x 60 = 3600000 = 1 hour)
restart=3600000

; Speech 1st word confidence (aka SARAH)
; The first word "SARAH" should be strong to remove false positive
; from 0 to 1
trigger=0.8

; Speech overall confidence
; The overall sentence can be lower than the 1st word
; from 0 to 1
confidence=0.70
```

```
; Reset grammar to default after given timeout (millis)
; When a context grammar (lazy) is loaded,
;   then SARAH will wait `ctxTimeout` milliseconds before automatically unloaded it
;   see the Plugin Development page for more info
ctxTimeout=60000
```

```
[directory]
; Path to XML Grammar directories
directory1=macros 
directory2=plugins
```

#### Speaker Manager

The C# client uses a Speaker Manager to perform Text to Speech and play music on all available devices.

```
; The dedicated voice to use
; you can call http://127.0.0.1:8888/?tts=test to listen to the current voice
; SARAH should be smart enough to use the default voice selected in Windows
; but if, for some reasons, you need to define the voice, then use this parameter
; e.g. voice=ScanSoft Virginie_Dri40_16kHz
; voice=Voice Text to Speech

; Speaker output (ID separated by "," -- use "all" for all your speakers)
; It's an ID. The default one is 0, that is the current default speaker
; if you want to use another speaker, or use several of them, you can do it with the below parameter
speaker=0

; EchoCancellationSpeaker (default is 0)
echo=0

; Speaker volume (multiply current 200% 50% ...)
spVolTTS=100
spVolPlay=100
```

#### Tweaks

Some SpeechEngine tweaks are exposed in the properties to tweak the engine behavior. See [Microsoft Documentation](http://msdn.microsoft.com/en-us/library/System.Speech.Recognition.SpeechRecognitionEngine_properties.aspx) for more info.

```
; Speech engines tweaks (in seconds) 
alternate=10
initialSilence=0
babble=0
endSilence=0
endSilenceAmbiguous=0
```

#### Debug Recognition

```
; Print trace logs. Output speech wav in /dump (must exists)    
; A `dump/` folder must be created at the root installation folder of SARAH.
; *All* matching recognitions will be dumped in that `dump/` folder 
;   with the audio (WAV file) and the related confidence.
debug=false

; Log file path (default "${basedir}/${shortdate}.log")
; logfile=${basedir}/${shortdate}.log

; Log2Console port
udpport=9999
```

#### Special Kinect settings

```
; speech only do not start other features (for low cpu)
; The parameter `only` will only start the speech recognition and stop the other features (face, gesture, ...)
only=false

; Kinect global FPS (1 = 30fps; 2 = 15fps; 3 = 10fps; 5 = 6fps)
; The parameter `fps` will decrease frame per second and reduce the CPU usage.
; when you use the Kinect recognition features (face, gesture, ...)
fps=2

; Sensor elevation +/- 27
; permit to change the orientation degree of the Kinect
elevation=0
```

#### Motion Detection (Depth)

The motion detection triggers a StandBy mode after a given amount of time. 
* The StandBy mode relies on Depth data. 
* When it's activated then the other Tasks are suspended.

```
; recognize motion (default is 200ms)
motion=200

; threashold % to detect motion (default 7%)
motionTH=7

; timeout starting stand-by (default 5*60*1000 = 300000 = 2 minutes)
standby=300000
```
#### Color Management

Compute the most prominent color of a color frame. It sends the color to the server every N milliseconds. That can be used to trigger the HUE plugin.

```
; detect most prominent (default is 0ms)
; delay between each send to the server
color=45
    
; time in millisec between 2 prominent color
colorTH=0
```

#### QRCode Recognition

Seek for a QRCode in color frame every N milliseconds.
* Skeleton tracking prevent the QRCode recognition (when the user is too far from camera)
* Do not work with other BarCodes because of the low resolution camera

```
; recognize qrcode (default is 200ms)
; delay between each QRCode recognition
qrcode=200

; time in millisec before next QRCode (default is 2000ms)
qrcodeTH=2000
```

#### Gesture Recognition

All the gestures must be described into the `plugins/*.gesture` files to then trigger the detection. The recognition is skipped if the skeleton is messed up.  
* Keep track of skeleton height
* Keep track of head location

```
; recognize gesture (default is 45ms)
gesture=45

; time in millisec before next gestures (default is 1000ms)
gestureTH=1000

; distance between head and foot must be more than this size in cm to avoid bug (defaut 80cm)
gestureFix=80

; Use seated gesture
seated=false

; Start gesture in StandBy mode (waiting for voice command)
gestureSB=false
```

The different gestures must be described into an XML file named `{plugin}.gesture`. Gesture recognition is performed by checking 3D position of 2 joints with each other. 

```xml
<gesture description="Hands Up" maxExecutionTime="1500" url="http://127.0.0.1:8080/sarah/gesture?g=5">
  <component firstJoint="WristLeft"      beginningRelationship="BelowAndLeft"  
             secondJoint="ShoulderLeft"  endingRelationship="AboveAndLeft" />
  <component firstJoint="WristRight"     beginningRelationship="BelowAndRight" 
             secondJoint="ShoulderRight" endingRelationship="AboveAndRight" />
</gesture>
```

Limitations:  
* Do not overlap gesture
* Multiple `component` in a gesture is complicated to perform
* Use gesture plugin to trigger rules if possible

![gesture schema](https://dl.dropboxusercontent.com/u/255810/Encausse.net/Sarah/github/skeleton.png)

See also: [SARAH: Reconnaissance gestuelle (in French)](http://encausse.wordpress.com/2012/10/08/s-a-r-a-h-allier-le-geste-a-la-parole/) 

#### Face Tracking

[Track 87 head point](http://msdn.microsoft.com/en-us/library/jj130970.aspx#ID4EJNAC1) and head animation to guess user mood.

```
; detect faces position (default is 45ms)
facedetec=45

; recognize faces (default is 200ms)
facereco=200

; track faces 3D Shapes (default is 45ms)
facetrack=45

; timeout in millisec for a given face (5*60*1000)
faceTH=300000

; Start face in StandBy mode (waiting for voice command)
faceSB=false
```

## Start

You're almost done. Follow the below two steps to start SARAH:

1. **Run the server**: double-click the file called `Server_NodeJS.cmd`       
  ➔ a MS-DOS window will open with several lines  
  ➔ you can open [http://127.0.0.1:8080](http://127.0.0.1:8080) into your Web browser to check the web interface

2. **Run the client** - several options:       
  + Microphone (if you don't have a Kinect): double-click the file called `Client_Microphone.cmd`;
  + Kinect (audio only): double-click the file called `Client_Kinect_Audio.cmd`;
  + Kinect (all features): double-click the file called `Client_Kinect`.  
  ➔ Once the client is loaded you'll see a small house icon close to the Windows clock.

All done! You can now say __"SARAH what time is it?"__. And to have more fun you can install a plugin (see below).

If you have any troubles, please refer to the [FAQ page](faq).

## Plugins

SARAH works because of the plugins.

### Installation

#### AppStore

The easiest and best way to install a plugin is to use the store: 

1. Open the SARAH Web interface ([http://127.0.0.1:8080](http://127.0.0.1:8080))  
2. Go to 'Store' (top menu)  
3. Install the required plugins (if it fails, try several times)  
4. Restart SARAH

#### Manual

It's also possible to manually install a plugin. To do so you have to unzip the archive into the `plugins` folder.
The structure:  
* plugins/demo/demo.js
* plugins/demo/demo.prop
* plugins/demo/demo.xml

### Plugins Configuration

Installed plugins are visible in your Web interface ([http://127.0.0.1:8080](http://127.0.0.1:8080)).

![Portlet](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/plugin_configuration_1.jpg)

1. Configuration
2. Documentation
3. File Editor

Some plugins provide a custom portlet. Click upper right corner to flip sides (works only with Chrome).

### Documentation

If you wonder how to use the plugin you can:
* Read the documention provided.
* If there is no documentation you can open the XML file to find the vocal commands.

## Update SARAH

If you want to udpate SARAH to a newer version (version less than 4) you need to follow the below steps:

1. Backup (rename) current install
2. Download and unzip the new version
3. Copy the below files/folders from your previous install to the new one:
  + `custom.prop`: it's the server configuration
  + `custom.ini`: it's the client configuration (make sure that nothing has been added in the new `custom.ini`)
  + `plugins/*`: it's all your plugins
  + `profile\profile.json`: contains data about current speakers
  + `profile\faces`: contains recorded faces
