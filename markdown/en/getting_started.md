# Getting Started

This page is for **SARAH v3** only. Please refer to [SARAH v4](installation_v4) if you want to test the new version.

## Index

* [Installation for Windows](#windows)
* [Configuration](#configuration)
* [Start](#start)
* [Plugins](#plugins)
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

### Kinect v2

Here are the instructions to install the second generation of Kinect:

1. Download and install the [Kinect SDK v2](http://www.microsoft.com/en-us/download/details.aspx?id=44561)
2. Download and install the [language packs v2](http://www.microsoft.com/en-us/download/details.aspx?id=43662) (make sure you choose the correct language)

## Configuration

Things you need to do:

1. Go to the `profile/` folder and delete the file `profile.json` otherwise SARAH will sometimes call you _Jean-Philippe_ !
2. Get the Google API Key ([see below](#get-the-google-api-key))
3. Look at the different settings into the `config.ini` file

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

#### Configuration

Installed plugins are visible in your Web interface ([http://127.0.0.1:8080](http://127.0.0.1:8080)).

![Portlet](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/plugin_configuration_1.jpg)

1. Configuration
2. Documentation
3. File Editor

Some plugins provide a custom portlet. Click upper right corner to flip sides (works only with Chrome).

#### Documentation

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
