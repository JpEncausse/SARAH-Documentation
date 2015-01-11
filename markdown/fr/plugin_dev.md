# Développement de plugin

**Cette documentation est faite pour SARAH v3 seulement**

## Sommaire

* [Structure des fichiers](#structure-des-fichiers)
* [Contenu des fichiers](#contenu-des-fichiers)
* [Publier le plugin](#publier-le-plugin)
* [Comment faire](#comment-faire)
  + [Comment envoyer une requête HTTP](#comment-envoyer-une-requête-http)
  + [Comment récupérer une partie d'une page Web](#comment-récupérer-une-partie-dune-page-web)
* [API JavaScript](#api-javascript)
  + [Fonctions pour les plugins](#fonctions-pour-les-plugins)
  + [HTTP Functions](#http-functions)
  + [JSDocs](#jsdocs)
  + [Fonctionnalités avancées](#fonctionnalités-avancées)
    * [Context](#context)
    * [Profile](#profile)
    * [Event](#event)
    * [AskMe](#askme)
    * [Chromeless](#chromeless)
* [Moteur de règles](#moteur-de-règles)
  + [Créer une règle](#créer-une-règle)
  + [Remarque](#remarque)
  + [Autres filtres](#autres-filtres)

## Structure des fichiers

Il y a quatre fichiers principaux (`yourplugin` doit être remplacé par le nom en minuscules de votre plugin) :

* `yourplugin.prop` : fichier qui définit votre plugin (comme la version, l'auteur, les paramètres de l'utilisateur, ...)
* `yourplugin.xml` :  fichier XML principal qui doit contenir la grammaire (commandes vocales)
* `index.html` : la documentation relative à votre plugin
* `yourplugin.js` (optionnel) : le fichier JavaScript de votre plugin qui gère les fonctions avancées
* `portlet.html` (optionnel): contient le contenu de la face (logo, ...) qui est visible depuis la page d'accueil de SARAH
* `portlet_back.html` (optionnel): contient le contenu du dos (boutons, formulaire, ...) qui est visible depuis la page d'accueil de SARAH

## Contenu des fichiers

### yourplugin.prop

Le contenu de ce fichier a une structure JSON de type :
```json
{
  "modules": {
    "yourplugin": {
      "description": "Ce plugin permet de faire des choses formidables.",
      "version": "1.0",
      "user_setting1": "[e.g. indiquer ici une astuce pour l'utilisateur]",
      "user_setting2": "[e.g. un indice sur quelle info il doit entrer ici]"
    }
  }
}
```

Remplacer `yourplugin` avec le nom en minuscules de votre plugin.

Vous pouvez définir des paramètres d'utilisateur dans ce fichier. Remplacer `user_setting1` par les données comme `server_ip_address` ou `key_code` ou autre. Vous pouvez aussi ajouter d'autres paramètres si nécessaire.

### yourplugin.xml

Ce sont les commandes de grammaire/vocales de votre plugin.

```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="ruleYourplugin" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleYourplugin" scope="public">
    <tag>out.action=new Object(); </tag>
    
    <item>Sarah</item>
    <one-of>
      <item>allumer la magie  <tag>out.action.myParam="on";out.action._attributes.tts="OK j'allume la magie"</tag></item>
      <item>éteindre la magie <tag>out.action.myParam="off";out.action._attributes.tts="OK j'éteins la magie"</tag></item>
    </one-of>

    <tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/yourplugin";</tag>
  </rule> 
</grammar>
```

Dans le code vous trouverez trois fois "Yourplugin" ou "yourplugin". Il suffit de remplacer par le nom de votre plugin (voir exemple).

* `<item>Sarah</item>` doit être inchangé : le programme va automatiquement changer "Sarah" par le nom défini dans la configuration (si, par exemple, SARAH est appelée Jarvis, alors vous devez laisser "Sarah" dans le fichier XML).
* `out.action._attributes.tts` est utilisé pour synthétiser directement la phrase.
* `out.action.myParam` : vous pouvez remplacer `myParam` par ce que vous voulez et ensuite l'utiliser dans le fichier JavaScript.
* `Switch on the magic` : SARAH exécutera la commande entre les `<tag>...</tag>` lorsque vous prononcerez `SARAH allume la magie`

### index.html

_à completer_

### yourplugin.js

_à completer_

### portlet.html

_To complete_

### portlet_back.html

_To complete_

## Publier le plugin

### Option 1: GitHub

[GitHub](http://www.github.com) est gratuit et permet gérer des versions, les bugs, les problèmes et ainsi de suite.

Aller sur [GitHub](http://www.github.com) et créer un nouveau repository appelé `SARAH-Plugin-{Nom}` (ou`{Nom}` est le nom de votre plugin, ex. "XBMC").

Votre repository doit contenir les fichiers / dossiers ci-dessous:
* `build/` : ce dossier est l'archive ZIP (voir ["Contenu du fichier ZIP"](#contenu-du-fichier-zip) ci-dessous)
* `plugins/{name}/` : ce dossier contient les fichiers de votre plugin (voir ["Structure des fichiers"](#structure-des-fichiers) ci-dessus) (remplacer`{name}` par le nom de votre plugin en minuscules)
* `README.md` (optionnel) : un fichier qui décrit votre projet.
* `changelog.md` (optionnel) : le fichier qui decrit les changements que vous avez apporté à votre plugin

### Option 2: Envoyer le fichier ZIP

Vous avez aussi la possibilité d'envoyer à `sarah.project [at] encausse.net` votre fichier ZIP au lieu de passer par GitHub.

### Contenu du fichier ZIP

Si vous hébergez le fichier ZIP sur GitHub, la taille limite est 10Mo.

Règles à suivre pour créer le fichier ZIP :
* Le nom du plugin doit être en minuscules, sans espace (par exemple "xbmc" ou "freebox" ou "messagetohome")
* Essayez de trouver un nom pertinent.
* L'archive ZIP doit contenir **directement** les fichiers/dossiers de votre plugin (donc les fichiers ne doivent pas être dans un sous-répertoire).
* **Github** : le fichier ZIP doit être placé dans `/build/` et nommé `{name}-release.zip` (avec `{name}` comme nom de votre plugin toujours en minuscules)

### Publication

Pour que le plugin soit disponible dans le _store_ il faut se rendre à  [http://marketplace.sarah.encausse.net/](http://marketplace.sarah.encausse.net/) puis s'identifier et enfin ajouter le nouveau plugin.

## Comment faire

### Comment envoyer une requête HTTP

SARAH s'articule autour de [l'API NodeJS](http://nodejs.org/documentation/api/), [le tutorial "Demo 5" (en français)](http://encausse.wordpress.com/2013/05/02/sarah-mon-premier-module/) explique comment créer un plugin qui envoie une requête en utilisant [l'API HTTP](http://nodejs.org/api/http.html).

Ci-dessous un exemple :

```javascript
exports.action = function(data, callback, config, SARAH){
  var url = 'http://www.website.com/';
  // on charge le module 'request' pour NodeJS
  // c'est un module spécial qui vient de https://github.com/request/request
  var request = require('request');
  // on forge notre requête
  request({ 'uri' : url }, function (err, response, body){
    if (err || response.statusCode != 200) {
      return callback({'tts': "Action échouée"});
    }
    // Ici vous pouvez analyser le corps de la réponse et jouer avec
    // par exemple : var json = JSON.parse(body);
    callback({'tts': 'La réponse' });
  }
}
```

Dans cet exemple le corps de la réponse est du JSON, mais parfois il est nécessaire d'analyser une réponse qui est en XML grâce à [node-xml2js](https://github.com/Leonidas-from-XIV/node-xml2js) ou un autre _parser_.

Un exemple pour du XML :

```javascript
var xml2js = require('xml2js');
var parser = new xml2js.Parser({trim: true});
parser.parseString(body, function (err, xml) {
  var root = xml.root; // voir la documentation de node-xml2js
  // Rappel : le code est asynchrone
  // donc il faut appeler callback({ ... }) à un moment ou un autre
}); 
```

### Comment récupérer une partie d'une page Web

Parfois il n'est pas possible d'avoir un contenu JSON ou XML. Dans ce cas on peut vouloir récupérer une partie d'une page Web. 

#### En utilisant Cheerio 

[Cheerio](https://github.com/MatthewMueller/cheerio) est un navigateur HTML très léger.

```javascript
var $ = require('cheerio').load(body, { 
  xmlMode: true,
  ignoreWhitespace: false,
  lowerCaseTags: false
});

// Le $ fonctionne comme pour jQuery afin de naviguer à travers le DOM
$('#prevision > H2').find('img').attr('alt');
```

Rappel : Cheerio ne gère pas les évènements JavaScript, ni le contenu HTML généré côté client.

#### En utilisant PhantomJS

PhantomJS est un navigateur Webkit très proche de NodeJS. Votre plugin tournera sous la machine virtuelle PhantomJS et renverra des petites données. PhantomJS est très lourd mais quelque fois c'est la seule solution si l'on souhaite remplir un formulaire, cliquer sur des boutons, etc.

Un plugin basé sur PhantomJS fonctionne comme les modules mais sera exécuté par PhantomJS. TL'URL à appeler pour ce plugin sera donc : `http://127.0.0.1:8080/sarah/phantom/{plugin}?{param}={value}`

Le fichier `{plugin}.prop` ressemblera à :
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

Rappel : ce fichier est appelé par PhantomJS, et non par NodeJS.

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

Le résultat peut aussi être géré par NodeJS grâce à un fichier `{plugin}.node.js`.

```javascript
exports.after = function(options, results){
  // >>> Your code here <<<
}
```

## JavaScript API

### Fonctions pour les plugins

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

| NodeJS           | Request          | Description    |
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
| *the below is for the requests only*                                |
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

**Parameters**

* {String} module : check if a module/phantom is available

**Return**

If the module is available the function will return `true`, or `false` if it's not available.

**Comments**

Since SARAH v2.8.

Example: if you have the plugin "freebox" you can test `SARAH.exists("freebox")`.

#### SARAH.answer()

**Parameters**

* No parameter

**Comments**

The function will randomly take one sentence from the `custom.prop`. You can change the default sentences via the web interface of SARAH: in the "A propos" widget, just click on the "Config." button. Each answers must be seperated with a pipe (|).

The default answers are `Oui|Je m'en occupe|Voilà|C'est fait`. So when you call `SARAH.answer()` the program will say "Oui", or "Voilà", or "Je m'en occupe". The answer is randomly chosen.

#### SARAH.speak(sentence, [callback])

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

**Parameters**

* {String} file : relative path to a MP3 or WAV file (e.g. `media/song.mp3`), or a web URL (e.g. `http://www.site.com/file.mp3`)
* {Function} [callback] : (optional) this is a callback function that will be called when the audio has been played

**Comments**

This function will play a sound file. The sounds can be parallelized.
However there is a timeout after 8 minutes (from SARAH v3.1, or 2 minutes for SARAH < v3.1) that will automatically stop the playing.

Regarding the **WAV file**, it must be a 88 kb/s encoded file (the 64 kb/s won't work).

#### SARAH.pause(file)

**Parameters**

* {String} file : relative path to a MP3 or WAV file (e.g. `media/song.mp3`), or a web URL (e.g. `http://www.site.com/file.mp3`)

**Comments**

This function will stop/pause a sound that is currently playing.
The `file` parameter must be the same used for `SARAH.play()`.

#### SARAH.runApp({run, [runp]})

**Parameters**

* {Object} the options
  + {String} run : the path to the program to execute
  + {String} [runp] : use this one to pass some parameters to the program

**Comments**

This function call the C# function [Process.Start(processName, param)](http://msdn.microsoft.com/en-us/library/system.diagnostics.process.start.aspx). Windows' rule: never use space or custom chars in path.

If you want to launch/run an executable program on **client** side:

```javascript
  // Lauching XBMC
  SARAH.runApp('E:\\XBMC12\\XBMC.exe');

  // Lauching Spotify with a song
  SARAH.runApp('C:\\Program Files (x86)\\Spotify\\spotify.exe', '"spotify:track:6ilfuI7O1vUfKf4TQ9fJRb"');
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

## Fonctionnalités avancées

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

## Moteur de règles

Just like [https://ifttt.com/](https://ifttt.com/), SARAH is able to trigger an action based on some rules.

### Créer une règle

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

### Remarque

Take care about the current TTS: if SARAH is currently speaking (because of the "If" plugin), she cannot speak (TTS from the "then" plugin) in the same time.

### Autres filtres

You can execute a rule before or after each plugin execution.
That's exactly the same than the "Modules" rules system, except that you don't have to select a "If" module.
