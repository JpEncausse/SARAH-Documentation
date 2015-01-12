# Plugin Development

**This is for SARAH v3**

You'll find here how to create a plugin.

**Note**: because SARAH is based on NodeJS you can use the [NodeJS API](http://nodejs.org/api/) into your JavaScript files.

## Index

* [Files structure](#files-structure)
* [Files content](#files-content)
* [Publish the plugin](#publish-the-plugin)
* [How to](#how-to)
  + [How to send an HTTP Request](#how-to-send-an-http-request)
  + [How to scrap a webpage](#how-to-scrap-a-webpage)
* [JavaScript API](#javascript-api)
  + [Plugins Functions](#plugins-functions)
  + [HTTP Functions](#http-functions)
  + [JSDocs](#jsdocs)
  + [Advanced features](#advanced-features)
    * [Context](#context)
    * [Profile](#profile)
    * [Event](#event)
    * [AskMe](#askme)
    * [Chromeless](#chromeless)
* [Rules Engine](#rules-engine)
  + [Create a rule](#create-a-rule)
  + [Note](#note)
  + [Other filters](#other-filters)

## Files structure

There are four main files (`yourplugin` must be replaced with the lower case name of your plugin):

* `yourplugin.prop`: the file that will define your plugin (like the version, the author, the user settings, ...)
* `yourplugin.xml`: the main XML file of your plugin that will contain the grammar (voice commands)
* `index.html`: the documentation related to your plugin
* `yourplugin.js` (optional): the main JavaScript file of your plugin (that will do the advanced features)
* `portlet.html` (optional): contains the front content (logo, ...) visible from SARAH homepage
* `portlet_back.html` (optional): contains the back content (buttons, forms, ...) visible from SARAH homepage

## Files content

### yourplugin.prop

The content of this file is a JSON structure that is:
```json
{
  "modules": {
    "yourplugin": {
      "description": "This plugin permits to do some great things.",
      "version": "1.0",
      "user_setting1": "[e.g. a tip here for the user]",
      "user_setting2": "[e.g. a tip here for the user]"
    }
  }
}
```

Replace `yourplugin` with the lower case name of your plugin.

In some cases you may want to have some settings defined by the user. You'll define them in this file. Replace `user_setting1` by anything that will make sense to the user like `server_ip_address` or `key_code` or whatever. And you can add more user settings.

### yourplugin.xml

This is the grammar/voice commands of your plugin.
```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="ruleYourplugin" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleYourplugin" scope="public">
    <tag>out.action=new Object(); </tag>
    
    <item>Sarah</item>
    <one-of>
      <item>Switch on the magic  <tag>out.action.myParam="on";out.action._attributes.tts="OK I switch on the magic"</tag></item>
      <item>Switch off the magic <tag>out.action.myParam="off";out.action._attributes.tts="OK I switch off the magic"<tag></item>
    </one-of>

    <tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/yourplugin";</tag>
  </rule> 
</grammar>
```
Check the code and you'll find **three** places where "Yourplugin" or "yourplugin" are. Just replace them with your plugin name (follow the case).

* `<item>Sarah</item>` must be unchanged: the program will automatically change "Sarah" by the name defined in the configuration (so, for example, if your SARAH is called Jarvis, then you must leave "Sarah" in the XML file).
* `out.action._attributes.tts` is used to directly vocalize some speech.
* `out.action.myParam`: you can replace `myParam` by anything and then use it in the JavaScript file.
* `Switch on the magic`: SARAH will trigger when you'll say `SARAH switch on the magic`

### index.html

_To complete_

### yourplugin.js

_To complete_

### portlet.html

_To complete_

### portlet_back.html

_To complete_

## Publish the plugin

### Option 1: GitHub

[GitHub](http://www.github.com) is free and permits to deal with the versionning, the bugs, issues, and so on.

Go to [GitHub](http://www.github.com) and create a new repository called `SARAH-Plugin-{Name}` (where `{Name}` is the name of your plugin, e.g. "XBMC").

Your repository must contain the below files/folders :
* `build/`: this folder is for the ZIP archives (see ["Content of the ZIP file"](#content-of-the-zip-file) below)
* `plugins/{name}/`: this folder will contain the files of your plugin (see ["Files Structure"](#files-structure) above) (replace `{name}` with your plugin name in lower case)
* `README.md` (optional): a file to describe your project
* `changelog.md` (optional): a file to explain the changes you've done on your plugin

### Option 2: Send a ZIP file

Instead of hosting your plugin on GitHub you can simply send a ZIP file to `sarah.project [at] encausse.net` (see below).

### Content of the ZIP file

If you host the ZIP file on GitHub, then the limit size is 10Mo.

Rules to follow to create the ZIP file:
* The plugin name must be in lower case, without any blank space (e.g. "xbmc" or "freebox" or "messagetohome")
* Try to find a name that is both obvious and relevant
* You must directly select the files of your plugins and zip them (you must **not** select the folder, but only the files inside the folder to create the archive)
* **Github**: the ZIP file must be moved to `/build/` and named as `{name}-release.zip` (with `{name}` is your plugin name in lower case)

### Publishing

For the plugin to be included into the store, you need to go to [http://marketplace.sarah.encausse.net/](http://marketplace.sarah.encausse.net/) then sign in and add a new plugin.

## How to

### How to send an HTTP Request

SARAH relies on [NodeJS API](http://nodejs.org/documentation/api/), [the tutorial "Demo 5" (in French)](http://encausse.wordpress.com/2013/05/02/sarah-mon-premier-module/) explains how to build a plugin that sends a request to a 3rd party using the [HTTP API](http://nodejs.org/api/http.html).

Below is an example:

```javascript
exports.action = function(data, callback, config, SARAH){
  var url = 'http://www.website.com/';
  // load the 'request' module from NodeJS
  // this is a special module from https://github.com/request/request
  var request = require('request');
  // build the request
  request({ 'uri' : url }, function (err, response, body){
    if (err || response.statusCode != 200) {
      return callback({'tts': "Action failed"});
    }
    // Here you can parse the body and play with it
    // e.g. : var json = JSON.parse(body);
    callback({'tts': 'The answer' });
  }
}
```

In this sample the body is parsed using `JSON`. But you could also [parse XML](https://github.com/Leonidas-from-XIV/node-xml2js) or any other text processing feature.

An example for XML:

```javascript
var xml2js = require('xml2js');
var parser = new xml2js.Parser({trim: true});
parser.parseString(body, function (err, xml) {
  var root = xml.root; // see documentation
  // Remember code is asynchronous
  // So you should call callback({ ... }) here
}); 
```

### How to scrap a webpage

Sometimes you can't just get a JSON or XML content. In that case you might want to scrap a webpage to get the content you want. 

#### Using Cheerio 

[Cheerio](https://github.com/MatthewMueller/cheerio) is a very light HTML Browser handling common issues. Like JSON or XML it parses the result of an HTTP request.

```javascript
var $ = require('cheerio').load(body, { 
  xmlMode: true,
  ignoreWhitespace: false,
  lowerCaseTags: false
});

// The $ works like jQuery to navigate throught DOM
$('#prevision > H2').find('img').attr('alt');
```

Remember Cheerio can't handle JavaScript click... or the generated HTML on the client side.

#### Using PhantomJS

PhantomJS is a third party Webkit Browser very close to NodeJS. Your plugin will run in PhantomJS VM and send back some little data. PhantomJS is very heavy but sometimes is the only way to fill HTML Form, click on buttons, etc...

The plugins based on PhantomJS work like the modules but are executed by PhantomJS to scrap a webpage. The URL to call that kind of plugin is: `http://127.0.0.1:8080/sarah/phantom/{plugin}?{param}={value}`

The `plugin.prop` file will look like this:
```json
{
  "phantoms" : { 
    "myplugin"  : {
      "description": "Description of My Demo Plugin",
      "version"    : "0.1"
    }
  }
}
```

Remember that this file is called by PhantomJS not NodeJS.

```javascript
// Inject helper
phantom.injectJs("../../script/lib/scraper.js");

// Merge default options with querystring
var options = {};
scraper.setOptions(options);

var url = 'http://path.to/page/to/scrap/index.php';

// Scrap
scraper.scrap(url, options, function(options, results) {
   // >>> Your code here <<<
   // >>> It is run into the webpage with jQuery <<<
   var items = $('body').text() ; 
   results.tts = items; // The object to return in callback()
});
```

The result can also be processed by NodeJS if a file `{plugin}.node.js` is provided.

```javascript
exports.after = function(options, results){
  // >>> Your code here <<<
}
```

## JavaScript API

### Plugins Functions

List of available functions to control plugins life cycle.

| NodeJS           | Description     |
| ---------------- | --------------- |
| SARAH.run()	   | Run script with given data |
| SARAH.call()	   | Like run without rule dispatch |
| SARAH.last()	   | Run latest script again (> v2.8) |
| [SARAH.exists()](#SARAH_exists)   | Check if module/phantom exists (> v2.8) |
| SARAH.remote()   | Run a client remote command (play, pause, …) |


To call a plugin you can use:
```javascript
// Run eedomus plugin with some parameters and trigger the Rule Engine
SARAH.run('eedomus', { 'periphId' : id , 'periphValue' : value });
   
// Call eedomus plugin without forwarding result to Rule Engine
SARAH.call('eedomus', { 'periphId' : LUMENS}, function(options){ /* do next stuff */  });
```

### HTTP Functions

List of available functions that send an HTTP Request to the Client. The requests are sent using `SARAH.remote()`

| JavaScript       | Request          | Description    |
| ---------------- | ---------------- | -------------- |
| [SARAH.answer()](#SARAH_answer)   |  | Call SARAH.speak() with predefined answers |
| [SARAH.speak()](#SARAH_speak)	   | tts=...&sync=... | Trigger Text to Speech (can be sync or async) |
| SARAH.shutUp()   | notts=...        | Stop speaking    |
| [SARAH.play()](#SARAH_play)	   | play=...&sync=...         | File.mp3 to play |
| [SARAH.pause()](#SARAH_pause)	   | pause=...        | File.mp3 to stop |
| SARAH.keyText()  | keyText=...      | Text to type |
| [SARAH.runApp()](#SARAH_runApp)   | run=...&runp=... | Application path to run and parameters |
| SARAH.activate() | activate=...     | Application to put foreground |
| SARAH.face()	   | face=...         | start/stop face recognition |
| SARAH.gesture()  | gesture=...      | start/stop gesture recognition |
| *the below is for the requests only, there is no JS functions*                            |
|                  | picture=...      | Take a picture, store it and return in response (only main Sensor)|
|                  | height=...       | Return user height [based on it's forearm](https://dl.dropboxusercontent.com/u/255810/Encausse.net/Sarah/skeleton.jpg) (value tts to speech) |
|                  | keyUp=...        | Key to press |
|                  | keyDown=...      | Key to press |
|                  | keyPress=...     | Key to press |
|                  | keyMod=...       | Key modifier |
|                  | status=...       | returns "speaking" if SARAH is currently speaking |
|                  | recognize=...    | Perform speech recognition on given audio path or upload |
|                  | listen=...       | Start / Stop listening |
|                  | context=...      | Activate context grammar |

### JSDocs

#### SARAH.exists(module)

Check if a module/phantom exists.

**Parameters**

* {String} module : name of the module/phantom to check

**Return**

If the module is available the function will return `true`, or `false` if it's not available.

**Comments**

Since SARAH v2.8.

Example: if you have the plugin "freebox" you can test `SARAH.exists("freebox")`.

#### SARAH.answer()

SARAH will say a random sentence.

**Parameters**

* No parameter

**Comments**

The function will randomly take one sentence from the `custom.prop`. You can change the default sentences via the [Web interface of SARAH](http://127.0.0.1:8080/home): in the "A propos" widget, just click on the "Config." button. Each answers must be seperated with a pipe (|).

The default answers are `Oui|Je m'en occupe|Voilà|C'est fait`. So when you call `SARAH.answer()` the program will say "Oui", or "Voilà", or "Je m'en occupe". The answer is randomly chosen.

#### SARAH.speak(sentence, [callback])

SARAH will speak (synchronously or asychronously).

**Parameters**

* {String} Sentence : this is the sentence that SARAH will say 
* {Function} [callback] : (optional) this is a callback function that will be called when the sentence has been said

**Comments**

The call is synchronous if you don't use a second parameter. Examples:
```javascript
SARAH.speak("Hello");
SARAH.speak("world");
SARAH.speak("I'm Sarah");
```

Then it will send 3 HTTP requests and only 1 will be said by SARAH. It's because the TTS requests are ignored when SARAH is currently speaking.

From SARAH V3.0 it's possible to change this behavior with cascading calls (=asynchronous):
```javascript
SARAH.speak("Hello", function(){
  SARAH.speak("world", function(){
    SARAH.speak("I'm Sarah", function(){
      // ...
    })
  })
})
```

It's still possible to use `SARAH.shutUp()` at any time to stop SARAH for speaking.

**Note** - you can check the status of SARAH in sending the request `http://127.0.0.1:8888/?status=true` : if it returns `speaking` then it means SARAH is current speaking, otherwise it returns nothing.

#### SARAH.play(file/url, [callback])

SARAH will read a MP3 or WAV file.

**Parameters**

* {String} file : relative path to a MP3 or WAV file (e.g. `media/song.mp3`), or a web URL (e.g. `http://www.site.com/file.mp3`)
* {Function} [callback] : (optional) this is a callback function that will be called when the audio has been played

**Comments**

This function will play a sound file. The sounds can be parallelized.
However there is a timeout after 8 minutes (from SARAH v3.1, or 2 minutes for SARAH < v3.1) that will automatically stop the playing.

Regarding the **WAV file**, it must be a 88 kb/s encoded file (the 64 kb/s won't work).

#### SARAH.pause(file)

Il will pause the audio file.

**Parameters**

* {String} file : relative path to a MP3 or WAV file (e.g. `media/song.mp3`), or a web URL (e.g. `http://www.site.com/file.mp3`)

**Comments**

This function will stop/pause a sound that is currently playing.
The `file` parameter must be the same used for `SARAH.play()`.

#### SARAH.runApp({run, [runp]})

Run a program.

**Parameters**

* {Object} the options
  + {String} run : the path to the program to execute
  + {String} [runp] : use this one to pass some parameters to the program

**Comments**

This function call the C# function [Process.Start(processName, param)](http://msdn.microsoft.com/en-us/library/system.diagnostics.process.start.aspx).

If you want to launch/run an executable program on **client** side:

```javascript
// Lauching XBMC
SARAH.runApp('E:\\XBMC12\\XBMC.exe');

// Lauching Spotify with a song
SARAH.runApp('C:\\Program Files (x86)\\Spotify\\spotify.exe', '"spotify:track:6ilfuI7O1vUfKf4TQ9fJRb"');

// or with Winamp
SARAH.runApp('C:\\Program Files (x86)\\Winamp\\winamp.exe', '"D:\\My Song.mp3"');
```

If you want to launch/run an executable program on **server** side:
```javascript
exports.action = function(data, callback, config, SARAH) {
  // see http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
  var exec = require('child_process').exec;
  
  // note: below we use double quotes inside (") the simple quotes (')
  // because we have some blank spaces in the path
  // for a relative path to SARAH you can use %CD%
  // example: var process = '%CD%\\\\plugins\\\\myplugin\\\\bin\\\\xbmc.bat';
  var process = '"C:\\\\Program Files (x86)\\\\XBMC\\\\XBMC.exe"'; 
  var child = exec(process, function (error, stdout, stderr) {
    if (error !== null) console.log('exec error: ' + error);
  });

  callback({'tts': "Je lance XBMC."});
}
```

## Advanced features

SARAH also provides advanced features throught its API to handle Context, Profile, Events, ...

### Context

Plugins can share contextual data for other plugins using `SARAH.context`. For example the XBMC plugin stores data in `SARAH.context.xbmc`.

If you want to use it with your plugin, then make sure to use the syntax: `SARAH.context.yourPluginName` (_yourPluginName_ is the name of the folder used by your plugin) to avoid any conflicts.

Because the data are only stored in memory (it means they are deleted after a restart of SARAH) you can use the below function to setup your context:
```javascript
exports.init = function(SARAH) {
  SARAH.context.myPluginName = {"someVariable": "someValue"}
}
```

### Profile

The `profile` variable contains some information regarding the profiles of each users. Example:

```javascript
SARAH.context.profile = 
[
  { Timestamp: "2013-11-10T14:00:11.1205204+01:00",
    Name: "Jean_Philippe", Pitch: 153.28974723815918,
    x: 0, y: 0, z: 0,
    Mood: 0, Height: 0 
  },
  { Timestamp: "2013-10-18T22:29:21.843015+02:00",
    Name: "Aurelie", Pitch: 0,
    x: 0, y: 0, z: 0,
    Mood: 0, Height: 0 
  }
]
```

### Event

A plugin can communicate with the other plugins in using [Event Emitter](http://nodejs.org/api/events.html#events_class_events_eventemitter) API. Plugins should listen to event in their `init()` function. 

On a side must listen to events (like XBMC):

```javascript
exports.init = function(SARAH){
  SARAH.listen('xbmc', function(data){
    // your code here
  });
}
```

On the other side XBMC will do:

```javascript
SARAH.trigger('xbmc', { key : value, x : 1, y : 2 });
```

**Note:** An other way to do this without code is to use the [Rules Engine](#rules-engine) `IF xbmc THEN DO YourPlugin`. XBMC must still put convenient data in `callback({})`.

### AskMe

A plugin can ask a question to the user then can be called back using the below function:

```javascript
SARAH.askme(tts, grammar, timeout, callback);
```

| Argument         | Description                  |
| ---------------- | ---------------              |
| tts	           | The text to speech           |
| grammar          | key/value grammar choice     |
| timeout          | timeout (if > 0 ask twice)   |
| callback         | function to call with answer |

* A dynamic grammar is set on the client side
* The grammar is exclusif (a context is set)
* After the given timeout, the question is asked again
* If there is no answer after `timeout x 2` or 8s the callback is called with `false`
* AskMe calls are stacked and buffered !

**Example: Plugin 1**

```javascript
SARAH.askme("What is your favorite color", {
  "My color is bleu" : 'blue',
  "My favorite color is blue no red" : 'red'
}, 10000, function(answer, end){ // the selected answer or false
  SARAH.speak('You said: ' + answer, function(){
      end(); // MUST be called when job done
  });
});
```

**Concurrent Plugin 2**

If Plugin 2 asks something at the same time, it will stack and wait.

```javascript
SARAH.askme("What is your favorite sound", {
  "I feel good" : 'feelggod',
  "Highway to hell" : 'ACDC'
}, 10000, function(answer, end){
  SARAH.call('xbmc', { 'song' : answer }, function(options){ end(); }); // Again a callback to wait
});
```

### Chromeless

A plugin can display a webpage on your screen without the browser bars:

```javascript
SARAH.chromeless(url, o, w, h, x, y)
```

| Argument         | Description        |
| ---------------- | ---------------    |
| url	           | URL to display     |
| o                | Browser's opacity  |
| w                | Browser's width    |
| h                | Browser's height   |
| x                | Browser's x   |
| y                | Browser's y   |

**Example**

```javascript
SARAH.chromeless('http://www.google.com', 80);
```

## Rules Engine

Just like [https://ifttt.com/](https://ifttt.com/), SARAH is able to trigger an action based on some rules.

### Create a rule

Let's use an example in order to understand how it works. Let's say we want to turn the lights on (using the `hue` plugin) when we pause a movie (using the `XBMC` plugin), and off when we play a movie.

First we're going to create a rule:

1. Open the Web interface ([http://127.0.0.1:8080](http://127.0.0.1:8080))  
2. Go to `Règles` (left menu)  
3. In the "Modules" section, you can modify an existing empty rule or create a new one by pressing the  "Ajouter une règle" button.  
4. Select the plugin (or module) which will trigger the other plugin ("If...")   
5. (Optional) Click on the "do" word to add some personalized code  
6. Finally select the plugin you want to be executed (the one that will be triggered)  

You now have two ways to do our example scenario.

_Disclaimer_: because it's an example the XML content of the `hue` and `xbmc` plugins is not the real one.

#### First way

This is the recommended way to do it.

When creating a new rule, you have the possibility to click on "do" (step 5) to add some personalized code. It's what we're going to do here.

In this box you can use the `SARAH` object as well as an object called `options` that contains the data coming from the first plugin.

You can first enter that below code into the "do" box:
```javascript
console.log("[DEBUG] ",options);
```

Then run the command you want (e.g. `SARAH play the movie`) and watch the server's window to find out the content of your `options` object. Let's say it returns the below data:
```javascript
{
  action: 'play',
  target: 'movie',
  body: {},
  _cmd: 'xbmc'
}
```

And do the same with `SARAH pause the movie`:
```javascript
{
  action: 'pause',
  target: 'movie',
  body: {},
  _cmd: 'xbmc'
}
```

Good, you can now look at the `hue.xml` file to find out which kind of parameters are used. Let's say we have the XML code below:
```xml
 <item repeat="0-1">
    <one-of>
      <item>turn on all the lights <tag>out.action.turnOn="true";out.action.allLights="true";</tag></item>
      <item>turn of all the lights <tag>out.action.turnOn="false";out.action.allLights="true";</tag></item>
	  </one-of>
  </item>
```

Two parameters are used: `turnOn` (equals to `"true"` to turn on and to `"false"` to turn off) and `allLights` (equals to `"true"`).

So now we can change the "do" box from the rule with the below code:
```javascript
// if it's a "play the movie" command
if (options.action=="play" && options.target=="movie") {
  // then turn off the lights
  options.turnOn="false";
  options.allLights="true";
} else {
  // if it's a "pause the movie"
  if (options.action=="pause" && options.target=="movie") {
    // then turn on the lights
    options.turnOn="true";
    options.allLights="true";
  }
}
```

Make sure to save the rule and now SARAH should turn on/off the lights based on the voice command related to play/pause a movie!

#### Second way

The second way consists to edit an XML file.

We first look at `hue.xml` to understand which parameters have to be passed to turn all the lights on/off:

```xml
 <item repeat="0-1">
    <one-of>
      <item>turn on all the lights <tag>out.action.turnOn="true";out.action.allLights="true";</tag></item>
      <item>turn of all the lights <tag>out.action.turnOn="false";out.action.allLights="true";</tag></item>
	  </one-of>
  </item>
```

So two parameters are used: `turnOn` (equals to `"true"` to turn on and to `"false"` to turn off) and `allLights` (equals to `"true"`).

We now look at the `xbmc.xml` file to find the part we want to change:
```xml
	<rule id="ruleXBMC" scope="public">
		<tag>out.action=new Object();</tag>
		<one-of>
			<item>play the movie<tag>out.action.action="play"; out.action.target="movie";</tag></item>
			<item>pause the movie<tag>out.action.action="pause"; out.action.target="movie";</tag></item>
		</one-of>
	</rule>
```

And finally we add the `hue` parameters. The `xbmc.xml` file will then look like:
```xml
	<rule id="ruleXBMC" scope="public">
		<tag>out.action=new Object();</tag>
		<one-of>
			<item>play the movie<tag>out.action.action="play"; out.action.target="movie"; out.action.turnOn="false"; out.action.allLights="true";</tag></item>
			<item>pause the movie<tag>out.action.action="pause"; out.action.target="movie"; out.action.turnOn="true"; out.action.allLights="true";</tag></item>
		</one-of>
	</rule>
```

We added `out.action.turnOn="false"; out.action.allLights="true";` to turn off the lights when playing the movie, and `out.action.turnOn="true"; out.action.allLights="true";` to do the contrary when we pause the movie.

Because of the rule we defined before the `out.action` parameters from `xbmc` will be sent to the `hue` plugin.

### Note

Take care about the current TTS: if SARAH is currently speaking (because of the "If" plugin), she cannot speak (TTS from the "then" plugin) in the same time.

### Other filters

You can execute a rule before or after each plugin execution.
That's exactly the same than the "Modules" rules system, except that you don't have to select a "If" module.
