# FAQ / How To

## Index

* [How to](#how-to)
  + [How to help?](#how-to-help)
  + [How to find someone to help me?](#how-to-find-someone-to-help-me)
  + [How to take a picture with a Kinect?](#how-to-take-a-picture-with-a-kinect)
  + [How to use QRCode?](#how-to-use-qrcode)
  + [How to delete my speech recognition profile?](#how-to-delete-my-speech-recognition-profile)
  + [How to split SARAH server and client between two computers?](#how-to-split-sarah-server-and-client-between-two-computers)
  + [How to change the language?](#how-to-change-the-language)
* [Various questions](#various-questions)
  + [What are the requirements?](#what-are-the-requirements)
  + [What does SARAH mean?](#what-does-sarah-mean)
  + [Which languages does SARAH speak?](#which-languages-does-SARAH-speak)
* [Plugins issues](#plugins-issues)
  + [Plugin fails the installation](#plugin-fails-the-installation)
  + [The server returns an error](#the-server-returns-an-error)
  + [I cannot configure the plugin](#i-cannot-configure-the-plugin)

## How to

### How to help?

* Talk on Social Networks and Blogs about SARAH
* Show SARAH to friends
* Build new plugins

You want to contribute to this documentation? [Go to the Github repository](https://github.com/JpEncausse/SARAH-Documentation/tree/gh-pages).

### How to find someone to help me?

Check the [Google+ group](https://plus.google.com/u/0/communities/105964514508504667709) and you'll probably find someone to help.

### How to take a picture with a Kinect?

Here are the steps:  

1. edit the `custom.ini` file and make sure to have `only=false`  
2. restart SARAH (you mustn't use `Client_Kinect_Audio`)  
3. right-click on the SARAH client icon (the house in the systray) and choose "Kinect_0"; that gives you access to the camera/motion/gesture/recognition  
4. take a picture by calling the URL [http://127.0.0.1:8888/?picture=true] (the picture will appear in the browser and will be stored into the `medias/` folder of SARAH)

### How to use QRCode?

You can show a QRCode to the SARAH's Kinect that will trigger an action:

1. Create a QRCode from [ZXing](http://zxing.appspot.com/generator) : the QRCode must represent an URL for a plugin's action (e.g. [http://127.0.0.1:8080/sarah/parle?phrase=Bonjour](http://127.0.0.1:8080/sarah/parle?phrase=Bonjour) for the `parle` plugin)  
2. Print the QRCode  
3. Show the QRCode to the Kinect (+/- 80cm)

### How to delete my speech recognition profile?

It's not good to do the speech recognition too many times. So you can try deleting your Windows "speech recognition profile" if SARAH doesn't understand you correctly anymore.  
Go to `Control Panel` ➜ `Speech Recognition` ➜ `Advanced speech options` ➜ `Recognition Profiles` ➜ `Delete...`

### How to split SARAH server and client between two computers?

_to complete_

### How to change the language?

To use SARAH in another language (here it's to English) you need to:  

1. Edit the `config.ini` file and change the language parameter, for example: `language=en-US`  
2. Update the plugins -- for each plugins:
  + Translate the voice commands you'll find into the `{plugin}.xml` file
  + Set attribute to `xml:lang="en-US"` in the `{plugin}.xml` file (so this file will start with `<grammar version="1.0" xml:lang="en-US"`)
  + Rename the `{plugin}.xml` file to `{plugin}_en_US.xml`
  

## Various questions

### What are the requirements?

The Operating System must be Windows (Windows 7, 8, 8.1 in 32 or 64bit), but it should also work with a Windows Virtual Machine over Linux and MacOS.

You must have a microphone, or a Kinect. The Kinect works much better for voice recognition, and also provides more features (gesture, face recognition, QRCode, ...).
If you want to use SARAH with a Kinect, please read that before:
* Kinect 1 for XBox360
  * Very cheap (~40€)
  * MUST have the USB wire and the power supply
  * According to licence: for developer only (so SARAH)
* Kinect 1 for Windows
  * More expensive
* Kinect 2 for Windows
  * Very Expensive
  * Still in beta

And finally you'll need to have an Internet connection.

Regarding the hardware to run SARAH, the program can be really laggy on a weak processor.

### What does SARAH mean?

S.A.R.A.H. means _Self Actuated Residential Automated Habitat_ and this name comes from TV Show _Eureka_.

### Which languages does SARAH speak?

SARAH support several languages but right now we are only focused on **English** and **French**.
However SARAH will only work with one language at a time that is defined in the `custom.ini` file.

The default language for SARAH is English, so make sure you follow the [installation guide](#getting_started) to install the language pack.

So far almost all the plugins are in French only.

## Plugins Issues

### Plugin fails the installation
   
It's a known bug related to GitHub.

* Try again several times
* Or try to manually install the plugin that has been downloaded into the `/temp/` folder of SARAH

### The server returns an error

If there is an error message in the server window saying `module not found` then it means there is an error with the plugin (either with the JavaScript `.js` file or the `.prop` file). Try to contact the plugin developer.

### I cannot configure the plugin

* There is a known bug with Internet Explorer, Firefox and others... In that case you'll have to use Chrome.
* Some touch devices, like LeapMotion, can conflict with the Portal Drag and Drop.
