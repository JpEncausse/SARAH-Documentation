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

## Files structure

There are four main files (`yourplugin` must be replaced with the lower case name of your plugin):

* `yourplugin.prop`: the file that will define your plugin (like the version, the author, the user settings, ...)
* `yourplugin.xml`: the main XML file of your plugin that will contain the grammar (voice commands)
* `index.html`: the documentation related to your plugin
* `yourplugin.js` (optional): the main JavaScript file of your plugin (that will do the advanced features)

## Files content

### yourplugin.prop

The content of this file is a JSON structure that is:
````xml
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
````

Replace `yourplugin` with the lower case name of your plugin.

In some cases you may want to have some settings defined by the user. You'll define them in this file. Replace `user_setting1` by anything that will make sense to the user like `server_ip_address` or `key_code` or whatever. And you can add more user settings.

### yourplugin.xml

This is the grammar/voice commands of your plugin.
````xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="ruleYourplugin" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleYourplugin" scope="public">
    <tag>out.action=new Object(); </tag>
    
    <item>Sarah</item>
    <one-of>
      <item>Switch on the magic  <tag>out.action.myParam="on";out.action._attributes.tts="OK I switch on the magic"</tag></item>
      <item>Switch off the magic <tag>out.action.myParam="off";out.action._attributes.tts="OK I switch off the magic"</tag></item>
    </one-of>

    <tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/yourplugin";</tag>
  </rule> 
</grammar>
````
Check the code and you'll find **three** places where "Yourplugin" or "yourplugin" are. Just replace them with your plugin name (follow the case).

* `<item>Sarah</item>` must be unchanged: the program will automatically change "Sarah" by the name defined in the configuration (so, for example, if your SARAH is called Jarvis, then you must leave "Sarah" in the XML file).
* `out.action._attributes.tts` is used to directly vocalize some speech.
* `out.action.myParam`: you can replace `myParam` by anything and then use it in the JavaScript file.
* `Switch on the magic`: SARAH will trigger when you'll say `SARAH switch on the magic`

### index.html

_To complete_

### yourplugin.js

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
    $('#prevision > H2').find('img').attr('alt')
}
```

Remember Cheerio can't handle JavaScript click... or the generated HTML on the client side.

#### Using PhantomJS

PhantomJS is a third party Webkit Browser very close to NodeJS. Your plugin will run in PhantomJS VM and send back some little data. PhantomJS is very heavy but sometimes is the only way to fill HTML Form, click on buttons, etc...

The plugins based on PhantomJS work like the modules but are executed by PhantomJS to scrap a webpage. The URL to call that kind of plugin is: `http://127.0.0.1:8080/sarah/phantom/{plugin}?{param}={value}`

The `plugin.prop` file will look like this:
```
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
