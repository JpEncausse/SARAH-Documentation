# FAQ / How To

SARAH v3 is current main stable version installed by community since 1 year waiting for v4 still in beta.  

- Please refer to [Global FAQ](faq) for question not related to the version of SARAH.
- Please refer to [SARAH v4](faq_v4) if you want to test the new version.


## Table of Content

## Hardware

### How to split SARAH server and client between two computers?

_to complete_


## Software

### How to change the language?

To use SARAH in another language (here it's to English) you need to:  

1. Edit the `config.ini` file and change the language parameter: `language=en-US`  
2. Update the plugins -- for each plugins:
  + Translate the voice commands you'll find into the `{plugin}.xml` file
  + Set attribute to `xml:lang="en-US"` in the `{plugin}.xml` file (so this file will start with `<grammar version="1.0" xml:lang="en-US"`)
  + Rename the `{plugin}.xml` file to `{plugin}_en_US.xml`
  

## SARAH : Client

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

## SARAH : Serveur

### The server display an error

If there is an error message in the server window saying `module not found` then it means there is an error with the plugin (either with the JavaScript `.js` file or the `.prop` file). Try to contact the plugin developer.

### Plugin fails the installation

Sometimes plugins installation fails. It should be downloaded in `/tmp` folder (otherwise ask the community).  

Try again or unzip manually the plugin.
