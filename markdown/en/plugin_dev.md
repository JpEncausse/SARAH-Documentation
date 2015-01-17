# Plugin Development

**This is for SARAH v3**

You'll find here how to create a plugin.

## Index

* [Files structure](#files-structure)
* [Files content](#files-content)
* [Publish the plugin](#publish-the-plugin)
* [How to](#how-to)
  + [How to send an HTTP Request](#how-to-send-an-http-request)
  + [How to scrap a webpage](#how-to-scrap-a-webpage)
  + [How to parse an XML file](#how-to-parse-an-xml-file)
  + [How to trigger a plugin using a text command sent by HTTP](#how-to-trigger-a-plugin-using-a-text-command-sent-by-HTTP)
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

There are four main files (`{plugin}` must be replaced with the lower case name of your plugin):

* `{plugin}.prop`: the file that will define your plugin (like the version, the author, the user settings, ...)
* `{plugin}.xml`: the main XML file of your plugin that will contain the grammar (voice commands)
* `index.html`: the documentation related to your plugin
* `lazy{plugin}.xml` (optional): it's not loaded by default but it can be loaded later with some special commands
* `{plugin}.js` (optional): the main JavaScript file of your plugin (that will do the advanced features)
* `portlet.html` (optional): contains the front content (logo, ...) visible from SARAH homepage
* `portlet_back.html` (optional): contains the back content (buttons, forms, ...) visible from SARAH homepage

## Files content

### {plugin}.prop

The content of this file is a JSON structure that is:
```json
{
  "modules": {
    "{plugin}": {
      "description": "This plugin permits to do some great things.",
      "version": "1.0",
      "user_setting1": "[e.g. a tip here for the user]",
      "user_setting2": "[e.g. a tip here for the user]"
    }
  }
}
```

Replace `{plugin}` with the lower case name of your plugin.

In some cases you may want to have some settings defined by the user. You'll define them in this file. Replace `user_setting1` by anything that will make sense to the user like `server_ip_address` or `key_code` or whatever. And you can add more user settings.

This file can also contain some info about the `cron` ... see below more info by searching for `exports.cron`.

### {plugin}.xml

This is the grammar/voice commands of your plugin.
```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="rule{plugin}" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="rule{plugin}" scope="public">
    <tag>out.action=new Object(); </tag>
    
    <item>Sarah</item>
    <one-of>
      <item>Switch on the magic  <tag>out.action.myParam="on";out.action._attributes.tts="OK I switch on the magic"</tag></item>
      <item>Switch off the magic <tag>out.action.myParam="off";out.action._attributes.tts="OK I switch off the magic"<tag></item>
    </one-of>

    <tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";</tag>
  </rule> 
</grammar>
```
Check the code and you'll find **three** places where "{plugin}" are. Just replace them with your plugin name (follow the case).

* `<item>Sarah</item>` must be unchanged: the program will automatically change "Sarah" by the name defined in the configuration (so, for example, if your SARAH is called Jarvis, then you must leave "Sarah" in the XML file).
* `out.action._attributes.tts` is used to directly vocalize some speech.
* `out.action.myParam`: you can replace `myParam` by anything and then use it in the JavaScript file.
* `Switch on the magic`: SARAH will trigger when you'll say `SARAH switch on the magic`

The Microsoft Speech Platform SDK 11 supports grammar files that use Extensible Markup Language (XML) elements and attributes, as specified in the [World Wide Web Consortium (W3C) Speech Recognition Grammar Specification (SRGS) Version 1.0](http://www.w3.org/TR/speech-grammar/). These XML elements and attributes represent the rule structures that define the words or phrases (commands) recognized by speech recognition engines.

The [MSDN Grammar Elements](http://msdn.microsoft.com/en-us/library/hh378341.aspx) describe Microsoft implementation. Here is a [Solitaire card game example](http://msdn.microsoft.com/en-us/library/hh378351.aspx).

**SARAH improves the Microsoft Grammar with the HTTP Parameters.** When an XML element is matched, then the ` <tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";</tag>` is executed.

And an object called `action` is created: 

* Each object tied to `action` will be sent as an HTTP request parameter (e.g. `out.action.myParam="1";`)
* The attribute `uri` defines the URI to request (e.g. `out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";`)

So, this will send the HTTP GET request: `http://127.0.0.1:8080/sarah/{plugin}?myParam=1`

**Notes**: 
* The grammar must follow the XML encoding: `&` becomes `&amp;`
* Actions must follow the HTTP encoding using: `encodeURIComponent()`
* Example with both: `<tag>out.action.param1=encodeURIComponent("Sam &amp; Max")</tag>`

Below is the list of attributes available for the grammar:  

| Name          |  Values         | Description   |
| ------------- | --------------- | --------------|
| uri	        | URI (http://)   | Define HTTP Request URI |
| tts	        | String          | Trigger Instant TTS |
| notts	        | boolean         | Stop Text To Speech |
| dictation	| boolean or lang | Send audio to Google. |
| play	        | Path or URI     | Play MP3/WAV/WMA local or stream |
| picture	| boolean         | Upload a photo taken by kinect (only main Sensor) |
| threashold	| float           | Override default confidence |
| context	| list            | Activate grammar list comma separated |
| listen	| boolean         | Stop/Start listening |
| restart	| boolean         | Restart speech engine |
| height        | boolean         | Say current user height in meter |

Let's have a look at the `dictation` attribute.
Microsoft Grammars are very efficient but use closed statement. In real life, some grammars need wildcard. For example: `SARAH search for * on Wikipedia`

The Microsoft `<ruleref special="GARBAGE" />` tag is used to bypass unknown audio between 2 known words. Then the attribute `dictation` will send this audio to Google.

See below a part of the XML file:
```xml
<tag>out.action=new Object();</tag>
<item>Sarah search for</item>
<ruleref special="GARBAGE" />
<item>on Wikipedia</item>
    
<tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";</tag>
<tag>out.action._attributes.dictation="true";</tag>
```

The value for the `dictation` attribute must be `true`, or it must be the language to detect (e.g. `en-US`).
To manage the Google reply you'll need to do it in the JavaScript file described below. The text recognized by Google will be returned into `data.dictation` (accessible in the `exports.action` function).

Below is an example of the JavaScript code for `{plugin}.js` using `data.dictation`:
```javasccript
exports.action = function(data, callback, config, SARAH){
  var search = data.dictation;
  // data.dictation returns all the sentence
  var rgxp = /Sarah search for (.+) on Wikipedia/i;
  
  // make sure it returns something good
  var match = search.match(rgxp);
  if (!match || match.length <= 1){
    return callback({'tts': "I don't understand"});
  }
  
  // we can now look at the searching words
  search = match[1];
  callback({'tts': "You want to search "+search+" on Wikipedia"});
}
```


### lazy{plugin}.xml

In real world, some grammars **do not need to be loaded** and require a given context. 

So the XML files starting with `lazy` are not loaded when SARAH starts. You need to use `out.action._attributes.context` to load the lazy file.

For example, below the `{plugin}.xml` file:
```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="ruleExample" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleExample" scope="public">
    <example>Sarah activate the special commands</example>
    <tag>out.action=new Object();</tag>

    <item>Sarah</item>
    <one-of>
      <item>activate the special commands
      	<tag>out.action._attributes.tts = "OK";</tag>
      	<tag>out.action._attributes.context = "lazyExample.xml"</tag>
      </item>
    </one-of>
  </rule> 
</grammar>
```

When you say `activate the special commands` SARAH will answer `OK` and will load the other grammar file called `lazyExample.xml`. It means **SARAH will only answer to the commands in the `lazyExample.xml` file** and not to **ANY** other commands, even from the other plugins.

Below is the content of the `lazyExample.xml` file:
```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="ruleLazyExample" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleLazyExample" scope="public">
    <tag>out.action=new Object();</tag>
    <item>Sarah</item>
    <one-of>
      <item>execute my special command<tag>out.action._attributes.tts = "OK master"</tag></item>
      <item>get back to normal
        <tag>out.action._attributes.tts = "OK no problem"</tag>
        <tag>out.action._attributes.context = "default"</tag>
      </item>
    </one-of>
    
    <tag>out.action._attributes.threashold="0.85";</tag>
  </rule> 
</grammar>
```

So when you say `SARAH get back to normal` it will unload the lazy grammar and it will get back to the normal grammars, so all the voice commands will work again. This is due to the tag `<tag>out.action._attributes.context = "default"</tag>`

Note: in this example we use `<tag>out.action._attributes.threashold="0.85";</tag>` ... please refer to the `{plugin}.xml` section above

Rules starting with "lazy" are not loaded:  
* In rule names (in the XML)  
* In file names

HTTP Server can also receive an HTTP request to do the same.

**Note**: after `ctxTimeout` milliseconds the context grammar will be automatically unloaded by SARAH -- this parameter is defined into the `config.ini` file (see [Getting Started](getting_started)).

### index.html

_To complete_

### {plugin}.js

**Note**: because SARAH is based on NodeJS you can use the [NodeJS API](http://nodejs.org/api/) into your JavaScript files.

A plugin can provide a JS file called `{plugin}.js`. This file contains the code to run for each HTTP request sent to: `http://127.0.0.1:8080/sarah/{plugin}?{param}={value}`

This `{plugin}.js` file should contain the below code:
```javascript
// `exports.action` is run when the plugin is called due to a voice recognition or an HTTP request
exports.action = function(data, callback, config, SARAH){
  // `config.modules.{plugin}` permits to get the parameters defined in `{plugin}.prop`
  var myConfig = config.modules.myplugin;
  
  // if you use the `{plugin}.prop` file shown before we can get the `user_setting1` value with:
  console.log("Value for user_setting1=", myConfig.user_setting1);
  
  // we can also get the data sent from the `{plugin}.xml` file used in the example before
  // it's `myParam` with value "on" or "off"
  console.log("Value of myParam=", data.myParam);
  
  // report to the JSDoc in this page to find what to do with SARAH variable
  // for example you can vocalize a sentence:
  SARAH.speak("Hello world!");

  // it's *MANDATORY* to finish your code by `callback({})`
  // (optional) you can pass one parameter that is a text to speech
  callback({'tts' : 'text to speech'});
}
```

Here is a description of the function's parameters:

| Params           | Description     |
| ---------------- | --------------- |
| data             | JSON object with the HTTP request parameters               |
| callback         | A function that MUST be called ONCE to release the request |
| config           | The JSON config file (.prop file)                          |
| SARAH            | The Singleton entry to API                                 |

The plugin can also declare variables and functions outside the `exports.action`. It will help to get a more readable code:
```javascript
exports.action = function(data, callback, config, SARAH){
  var value = yourcodehere();
  callback(value);
}

var yourcodehere = function(){
  // your code here
  return 'something';
}
```

The scope of this above code is only for this plugin and it's stored into the memory. If the plugin's file is modified, then the memory is wiped and the code is reloaded.

**Some other special functions** are available.

`exports.init` is an initialization function that is called when the server starts and when the plugin is reloaded:
```javascript
exports.init = function(SARAH) {
  // your code here
}
```

This function can be used to initialize data, setup a server, etc...

`exports.speak` is a function to override the default TTS or to find an other way to perform the text to speech. If `tts` is false then the speech is canceled. If `async` is true then the function is called twice with the second call with `async=false`.
```javascript
exports.speak = function(tts, async, SARAH){
  // your code here
  return tts;
}
```

| Params           | Description     |
| ---------------- | --------------- |
| tts              | The text to speech  |
| async            | True if async, False if sync or end of speech  |
| SARAH            | Singleton API   |


`exports.standBy` is a function that handles the motion/standby state of clients.
```javascript
exports.standBy = function(motion, data, SARAH){
  // `motion` is a boolean true/false
}
```

`exports.cron` permits to call a plugin at a given time schedule.

You'll need to add the below info into the `{plugin}.prop` file -- these info can co-exist with the regular `modules` info that you usually find into the `{plugin}.prop` file. The `name` or `description` properties will then be duplicated for both the `modules` and `cron` tags in this file.
```javascript
{
  "cron" : {
    "myplugin" :   { 
      "name"       : "myplugin",
      "description": "Description of My Demo Plugin",
      "time"       : "0 */5 * * * *",
      "param1"     : "(optional) [param to be defined by the user]",
      "param2"     : "(optional) [another parameter]"
    }
  }
}
```

The `time` parameter is a [CRON](http://en.wikipedia.org/wiki/Crontab) notation.

Then the JavaScript code is:
```javascript
exports.cron = function(callback, task, SARAH){
  // >>> your code here <<<
  callback({'tts' : 'text to speech'});
}
```

The `task` parameter is a JSON object of the plugin's cron config.

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

### How to parse an XML file

#### Using the XMLDoc library

Here we'll use [XMLDoc](https://github.com/nfarina/xmldoc) instead of `xml2js` to read an XML file.

You need first to download the [xmldoc.js](https://github.com/nfarina/xmldoc/blob/master/lib/xmldoc.js) file from Github. Save it in the same folder than your plugin files.

Now, for our example, we'll use the file called `children.xml`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CHILDREN>
  <CHILD name="luc" age="11" sex="M"/>
  <CHILD name="sophie" age="12" sex="F"/>
  <CHILD name="marie" age="13" sex="F"/>
  <CHILD name="damien" age="14" sex="M"/>
  <CHILD name="mathieu" age="15" sex="M"/>
</CHILDREN>
```

To read this file we need the below code:
```javascript
// first we need to load the xmldoc library downloaded before
// if you have it in a ` lib/` folder
var xmldoc = require('./lib/xmldoc');
// `fs` is a NodeJS module: http://nodejs.org/api/fs.html
var fs = require('fs');
var xmlFile = fs.readFileSync(__dirname+'\\children.xml');
// we load the XML file
var file = new xmldoc.XmlDocument(xmlFile);
```

Now if you want to find an information:
```javascript
// reach the line where name="marie"
var child = file.childWithAttribute("name", "marie");
// then you can use the other attributes
console.log(child.attr.name+" is a "+(chidl.attr.sex==="M"?"boy":"girl");
// -> "marie is a girl"
```

Note: if several lines are concerned, then it will return only the first one.

## How to trigger a plugin using a text command sent by HTTP

The framework provides, **for Kinect**, a way to compare given text with the client's grammars. The text is compared using phonetical meaning.

For example: `http://127.0.0.1:8888?emulate=SARAH+what+time+is+it`

The client returns the vocalized text if it understood the command. Otherwise it will return the **last** vocalized text.

It's used by the Android app that performs a local speech to text, and then send it to the client using this request.

## JavaScript API

### Plugins Functions

List of available functions to control plugins life cycle.

| NodeJS           | Description     |
| ---------------- | --------------- |
| SARAH.run()	   | Run script with given data |
| SARAH.call()	   | Like run without rule dispatch |
| SARAH.last()	   | Run latest script again (> v2.8) |
| SARAH.exists()   | Check if module/phantom exists (> v2.8) |
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
| SARAH.answer()   |  | Call SARAH.speak() with predefined answers |
| SARAH.speak()	   | tts=...&sync=... | Trigger Text to Speech (can be sync or async) |
| SARAH.shutUp()   | notts=...        | Stop speaking    |
| SARAH.play()	   | play=...&sync=...         | File.mp3 to play |
| SARAH.pause()	   | pause=...        | File.mp3 to stop |
| SARAH.keyText()  | keyText=...      | Text to type |
| SARAH.runApp()   | run=...&runp=... | Application path to run and parameters |
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

If you want to use it with your plugin, then make sure to use the syntax: `SARAH.context.{plugin}Name` (_{plugin}Name_ is the name of the folder used by your plugin) to avoid any conflicts.

Because the data are only stored in memory (it means they are deleted after a restart of SARAH) you can use the below function to setup your context:
```javascript
exports.init = function(SARAH) {
  SARAH.context.myPluginName = {"someVariable": "someValue"}
}
```

### Profile

The `SARAH.context.profile` variable contains some information regarding the profiles of each users. Example:

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

Example with the XBMC plugin that is listening for new events:

```javascript
exports.init = function(SARAH){
  SARAH.listen('xbmc', function(data){
    // your code here
  });
}
```

And to call it from another plugin we'll use:

```javascript
SARAH.trigger('xbmc', { key : value, x : 1, y : 2 });
```

**Note:** An other way to do this without code is to use the [Rules Engine](#rules-engine) `IF xbmc THEN DO {plugin}`.

### AskMe

A plugin can ask a question to the user then can be called back using the below function:

```javascript
SARAH.askme(tts, grammar, timeout, callback);
```

| Argument         | Description                  |
| ---------------- | ---------------              |
| tts	           | The question to ask          |
| grammar          | The possible answers         |
| timeout          | timeout (if > 0 the question is asked twice)   |
| callback         | function to call with the answer returned by SARAH |

* A dynamic grammar is set on the client side
* The grammar is exclusive (a context is set)
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

If Plugin 2 asks something at the same time than plugin 1, it will stack and wait.

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
