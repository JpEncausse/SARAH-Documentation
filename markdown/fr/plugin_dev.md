# Développement de plugin

**Cette documentation est faite pour SARAH v3 seulement**

## Sommaire

* [Structure des fichiers](#structure-des-fichiers)
* [Contenu des fichiers](#contenu-des-fichiers)
* [Publier le plugin](#publier-le-plugin)
* [Comment faire](#comment-faire)
  + [Comment envoyer une requête HTTP](#comment-envoyer-une-requête-http)
  + [Comment récupérer une partie d'une page Web](#comment-récupérer-une-partie-dune-page-web)
  + [Comment analyser un fichier XML](#comment-analyser-un-fichier-xml)
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

Il y a quatre fichiers principaux (`{plugin}` doit être remplacé par le nom en minuscules de votre plugin) :

* `{plugin}.prop` : fichier qui définit votre plugin (comme la version, l'auteur, les paramètres de l'utilisateur, ...)
* `{plugin}.xml` :  fichier XML principal qui doit contenir la grammaire (commandes vocales)
* `index.html` : la documentation relative à votre plugin
* `lazy{plugin}.xml` (optionnel): il n'est pas chargé par défaut mais il peut l'être plus tard grâce à des commandes spéciales
* `{plugin}.js` (optionnel) : le fichier JavaScript de votre plugin qui gère les fonctions avancées
* `portlet.html` (optionnel): contient le contenu de la face (logo, ...) qui est visible depuis la page d'accueil de SARAH
* `portlet_back.html` (optionnel): contient le contenu du dos (boutons, formulaire, ...) qui est visible depuis la page d'accueil de SARAH

## Contenu des fichiers

### {plugin}.prop

Le contenu de ce fichier a une structure JSON de type :
```json
{
  "modules": {
    "{plugin}": {
      "description": "Ce plugin permet de faire des choses formidables.",
      "version": "1.0",
      "user_setting1": "[e.g. indiquer ici une astuce pour l'utilisateur]",
      "user_setting2": "[e.g. un indice sur quelle info il doit entrer ici]"
    }
  }
}
```

Remplacer `{plugin}` avec le nom en minuscules de votre plugin.

Vous pouvez définir des paramètres d'utilisateur dans ce fichier. Remplacer `user_setting1` par les données comme `server_ip_address` ou `key_code` ou autre. Vous pouvez aussi ajouter d'autres paramètres si nécessaire.

Ce fichier peut aussi contenir des infos en rapport au `cron` ... pour plus d'informations, voir plus bas en cherchant `exports.cron`.

### {plugin}.xml

Ce sont les commandes de grammaire/vocales de votre plugin.

```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="rule{plugin}" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="rule{plugin}" scope="public">
    <tag>out.action=new Object(); </tag>
    
    <item>Sarah</item>
    <one-of>
      <item>allumer la magie  <tag>out.action.myParam="on";out.action._attributes.tts="OK j'allume la magie"</tag></item>
      <item>éteindre la magie <tag>out.action.myParam="off";out.action._attributes.tts="OK j'éteins la magie"</tag></item>
    </one-of>

    <tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";</tag>
  </rule> 
</grammar>
```

Dans le code vous trouverez trois fois "{plugin}". Il suffit de remplacer par le nom de votre plugin (voir exemple).

* `<item>Sarah</item>` doit être inchangé : le programme va automatiquement changer "Sarah" par le nom défini dans la configuration (si, par exemple, SARAH est appelée Jarvis, alors vous devez laisser "Sarah" dans le fichier XML).
* `out.action._attributes.tts` est utilisé pour synthétiser directement la phrase.
* `out.action.myParam` : vous pouvez remplacer `myParam` par ce que vous voulez et ensuite l'utiliser dans le fichier JavaScript.
* `Switch on the magic` : SARAH exécutera la commande entre les `<tag>...</tag>` lorsque vous prononcerez `SARAH allume la magie`

Le _Microsoft Speech Platform SDK 11_ supporte les fichiers de grammaire qui utilisent les éléments et attributs de _Extensible Markup Language (XML)_, comme indiqué dans le [World Wide Web Consortium (W3C) Speech Recognition Grammar Specification (SRGS) Version 1.0](http://www.w3.org/TR/speech-grammar/). Ces éléments et attributs XML représentent les règles de la struture qui définissent les mots et phrases (commandes) reconnus par le moteur de reconnaissance vocale

Les [MSDN Grammar Elements](http://msdn.microsoft.com/en-us/library/hh378341.aspx) décrivent l'implémentation de Microsoft. Voir [l'exemple du jeu de carte le Solitaire](http://msdn.microsoft.com/en-us/library/hh378351.aspx).

**SARAH améliore la grammaire de Microsoft avec des paramètres HTTP.** Quand un élément XML correspond, alors le tag ` <tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";</tag>` est exécuté.

Et un objet appelé `action` est créé : 

* Chaque objet lié à `action` sera envoyé comme un paramètre de la requête HTTP (par exemple `out.action.myParam="1";`)
* L'attribut `uri` définit l'URI de la requête (par exemple `out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";`)

Donc, cela enverra une requête HTTP GET : `http://127.0.0.1:8080/sarah/{plugin}?myParam=1`

**Remarques** : 
* La grammaire doit suivre les règles d'encodage de XML : `&` devient `&amp;`
* Les actions doivent suivre les règles d'encodage HTTP en utilisant : `encodeURIComponent()`
* Exemple avec les deux : `<tag>out.action.param1=encodeURIComponent("Sam &amp; Max")</tag>`

Ci-dessous la liste des attributs disponibles dans la grammaire :  

| Name          |  Values         | Description   |
| ------------- | --------------- | --------------|
| uri	        | URI (http://)   | Définit l'URI de la requête HTTP |
| tts	        | String          | Déclenche un TTS (donc lit la phrase) |
| notts	        | boolean         | Arrête le Text To Speech |
| dictation	| boolean or lang | Envoie l'audio à Google |
| play	        | Path or URI     | Joue un fichier MP3/WAV/WMA local ou en streaming |
| picture	| boolean         | Upload une photo prise par le Kinect |
| threashold	| float           | Modifie la confidence par défaut |
| context	| list            | Active la grammaire listée (on peut en mettre plusieurs qui seront séparées par une virgule) |
| listen	| boolean         | Démarre/Arrête l'écoute |
| restart	| boolean         | Redémarre le moteur de vocalisation |
| height        | boolean         | Donne la taille de l'utilisateur actuel en mètre |

Regardons de plus près l'attribut `dictation`.
Les grammaires de Microsoft sont très efficaces mais concernent des phrases précises. Dans la vraie vie des grammaires peuvent avoir besoin d'un _joker_. Par exemple : `SARAH cherche * sur Wikipedia`

Le tag `<ruleref special="GARBAGE" />` de Microsoft est utilisé pour récupérer l'audio inconnu entre deux mots connus. Ensuite l'attribut `dictation` enverra cet audio vers Google.

Ci-dessous une partie d'un fichier XML :
```xml
<tag>out.action=new Object();</tag>
<item>Sarah cherche</item>
<ruleref special="GARBAGE" />
<item>sur Wikipedia</item>
    
<tag>out.action._attributes.uri="http://127.0.0.1:8080/sarah/{plugin}";</tag>
<tag>out.action._attributes.dictation="true";</tag>
```

La valeur de l'attribut `dictation` doit être `true`, ou ça doit être la langue à détecter (par exemple `en-US`).
Pour gérer la réponse de Google il va falloir utiliser le fichier JavaScript décrit plus bas. Le texte reconnu par Google est fourni par la variable `data.dictation` (accessible dans la fonction `exports.action`).

Ci-dessous un exemple de code JavaScript pour le fichier `{plugin}.js` utilisant `data.dictation`:
```javasccript
exports.action = function(data, callback, config, SARAH){
  var search = data.dictation;
  // data.dictation returne toute la phrase dite par l'utilisateur
  var rgxp = /Sarah cherche (.+) sur Wikipedia/i;
  
  // on s'assure que Google a bien compris
  var match = search.match(rgxp);
  if (!match || match.length <= 1){
    return callback({'tts': "Je ne comprends pas"});
  }
  
  // on peut maintenant s'occuper des mots qui sont recherchés
  search = match[1];
  callback({'tts': "Tu veux chercher "+search+" sur Wikipedia"});
}
```

### lazy{plugin}.xml

Dans la réalité, des grammaires **n'ont pas toujours besoin d'être chargées** et demandent un contexte particulier. 

Donc les fichiers XML qui commencent par `lazy` ne sont pas chargés quand SARAH démarre. Il faudra utiliser `out.action._attributes.context` pour charger le fichier `lazy`.

Par exemple, ci-dessous le code du fichier `{plugin}.xml` :
```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="ruleExample" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleExample" scope="public">
    <example>Sarah active les commandes spéciales</example>
    <tag>out.action=new Object();</tag>

    <item>Sarah</item>
    <one-of>
      <item>active les commandes spéciales
      	<tag>out.action._attributes.tts = "OK";</tag>
      	<tag>out.action._attributes.context = "lazyExample.xml"</tag>
      </item>
    </one-of>
  </rule> 
</grammar>
```

Quand vous allez dire `active les commandes spéciales` SARAH répondra `OK` et chargera l'autre fichier de grammaire qui s'appelle `lazyExample.xml`. Cela signifie que **SARAH répondra seulement aux commandes de ce fichier `lazyExample.xml`** et à **AUCUNE** autre commandes vocales, même des autres plugins.

Ci-dessous le contenu du fichier `lazyExample.xml` :
```xml
<grammar version="1.0" xml:lang="fr-FR" mode="voice" root="ruleLazyExample" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleLazyExample" scope="public">
    <tag>out.action=new Object();</tag>
    <item>Sarah</item>
    <one-of>
      <item>exécute ma commande spéciale<tag>out.action._attributes.tts = "OK maitre"</tag></item>
      <item>retourne à la normale
        <tag>out.action._attributes.tts = "OK pas de problème"</tag>
        <tag>out.action._attributes.context = "default"</tag>
      </item>
    </one-of>
    
    <tag>out.action._attributes.threashold="0.85";</tag>
  </rule> 
</grammar>
```

Donc quand vous direz `SARAH retourne à la normale` cela déchargera la grammaire `lazy` et on retournera aux grammaires normales, et donc toutes les commandes vocales refonctionneront. Cela est dû au tag  `<tag>out.action._attributes.context = "default"</tag>`

Remarque : dans cet exemple on utilise `<tag>out.action._attributes.threashold="0.85";</tag>` ... se référer àa la section ci-dessus à propos de `{plugin}.xml`

Rules starting with "lazy" are not loaded:  
Les règles commençant avec "lazy" ne sont pas chargées :
* Dans le nom des règles (dans le XML)  
* Dans le nom des fichiers

Le serveur HTTP peut aussi recevoir des requêtes HTTP pour faire de même.

**Remarque** : après `ctxTimeout` millisecondes la grammaire de contexte sera automatiquement déchargée par SARAH -- ce paramètre est configurable dans le fichier `config.ini` (voir [Premiers Pas](getting_started)).

### index.html

_à completer_

### {plugin}.js

**Remarque** : comme SARAH est basé sur NodeJS, vous pouvez utiliser [l'API NodeJS](http://nodejs.org/api/) dans vos fichiers JavaScript.

Un plugin peut fournir un fichier JS nommé `{plugin}.js`. Ce fichier contient le code à exécuter pour chaque requête HTTP envoyée vers `http://127.0.0.1:8080/sarah/{plugin}?{param}={value}`

Ce fichier `{plugin}.js` doit contenir le code ci-dessous:
```javascript
// `exports.action` est exécuté quand le plugin est appelé via la reconnaissance vocale ou une requête HTTP
exports.action = function(data, callback, config, SARAH){
  // `config.modules.{plugin}` permet de récupérer les paramètres du plugin définis dans `{plugin}.prop`
  var myConfig = config.modules.myplugin;
  
  // si on utilise le fichier `{plugin}.prop` montré précédemment
  // alors on peut récupérer la valeur de `user_setting1`
  console.log("Value for user_setting1=", myConfig.user_setting1);
  
  // on peut aussi connaitre les données envoyés via `{plugin}.xml`
  // dans l'exemple précédent on avait `myParam` avec deux valeurs possibles "on" ou "off"
  console.log("Value of myParam=", data.myParam);
  
  // se référer à la partie JSDoc de cette page pour savoir quoi faire avec la variable SARAH
  // par exemple, pour vocaliser une phrase:
  SARAH.speak("Hello world!");

  // il est *OBLIGATOIRE* de finir son code en appelant `callback({})`
  // (optionnel) on peut passer un paramètre qui est le texte à vocaliser
  callback({'tts' : 'text to speech'});
}
```

Ci-dessous une description des paramètres de cette fonction :

| Params           | Description     |
| ---------------- | --------------- |
| data             | un objet JSON avec les paramètres de la requête HTTP  |
| callback         | Une fonction qui DOIT être appelée au moins UNE FOIS dans le code |
| config           | Le fichier de config JSON (le fichier .prop)                          |
| SARAH            | The Singleton entry to API                                 |

Un plugin peut aussi déclarer d'autres variables et fonctions en dehors de `exports.action`. Cela peut permettre d'avoir un code plus lisible:
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

Le cadre d'exécution du code précédent is uniquement à l'intérieur de ce plugin et est enregistré en mémoire. Si ce fichier est modifié, alors la mémoire est vidée et le code est rechargé.

**D'autres fonctions spéciales** sont disponibles.

`exports.init` est une fonction d'initialisation qui est appelée quand le serveur démarre et when le plugin est rechargé:
```javascript
exports.init = function(SARAH) {
  // your code here
}
```

Cette fonction peut être utilisée pour initialiser des données, configurer un serveur, etc...

`exports.speak` est une fonction qui permet de surcharger la fonction TTS par défaut. Si `tts` est `false` alors la vocalisation est annulée. Si `async` est `true` alors la fonction est appelée deux fois, dont le second appel avec `async=false`.
```javascript
exports.speak = function(tts, async, SARAH){
  // your code here
  return tts;
}
```

| Params           | Description     |
| ---------------- | --------------- |
| tts              | le texte à dire  |
| async            | True si async, False sinon  |
| SARAH            | Singleton API   |


`exports.standBy` est une fonction qui gère les mouvements/standby.
```javascript
exports.standBy = function(motion, data, SARAH){
  // `motion` is a boolean true/false
}
```

`exports.cron` permet d'appeler un plugin à des moments plannifiés.

Il faudra ajouter l'information décrite ci-dessous dans le fichier `{plugin}.prop` -- cette information peut co-exister avec l'info concernant le `modules` qu'on retrouve d'habitude dans ce fichier `{plugin}.prop`. Les propriétés `name` et `description` se retrouvent alors dupliqués pour les deux tags `modules` et  `cron` dans ce même fichier.
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

Le paramètre `time` suit la notation de [CRON](http://fr.wikipedia.org/wiki/Crontab).

Ensuite le JavaScript code sera le suivant:
```javascript
exports.cron = function(callback, task, SARAH){
  // >>> your code here <<<
  callback({'tts' : 'text to speech'});
}
```

Le paramètre `task` est un objet JSON reprenant la confi du cron.

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

### Comment analyser un fichier XML

#### En utilisant la bibliothèque XMLDoc

Ici nous allons utiliser [XMLDoc](https://github.com/nfarina/xmldoc) au lieu de `xml2js` pour lire un fichier XML.

Vous aurez d'abord besoin de télécharger [xmldoc.js](https://github.com/nfarina/xmldoc/blob/master/lib/xmldoc.js) depuis Github puis de l'engistrer dans le même répertoire que votre plugin.

Maintenant, pour notre example, nous allons utiliser un fichier appelé `children.xml`:

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

Pour lire ce fichier on a besoin du code ci-dessous:
```javascript
// d'abord il faut charger la bibliothèque `xmldoc` qu'on a téléchargé
var xmldoc = require('./lib/xmldoc');
// `fs` est un module de NodeJS : http://nodejs.org/api/fs.html
var fs = require('fs');
var xmlFile = fs.readFileSync(__dirname+'\\children.xml');
// on charge le fichier XML
var file = new xmldoc.XmlDocument(xmlFile);
```

Maintenant pour trouver une information:
```javascript
// on cherche la ligne qui a l'attribute name="marie"
var child = file.childWithAttribute("name", "marie");
// et maintenant on peut retrouver les autres attributs
console.log(child.attr.name+" est "+(chidl.attr.sex==="M"?"un garçon":"une fille");
// -> "marie est une fille"
```

Remarque : si plusieurs lignes existent, alors seule la première est retrouvée.

## JavaScript API

### Fonctions pour les plugins

Liste des fonctions disponibles pour le contrôle du cycle de vie des plugins :

| NodeJS           | Description     |
| ---------------- | --------------- |
| SARAH.run()	   | Exécute un script donné avec des paramètres |
| SARAH.call()	   | Exécute un script donné, mais sans enclencher le moteur de règles |
| SARAH.last()	   | Rééxécute le dernier script appelé Run (> v2.8) |
| [SARAH.exists()](#SARAH_exists)   | Vérifie si un module/phantom existe (> v2.8) |
| SARAH.remote()   | Exécute une commande sur le client (play, pause, …) |


Pour exécuter un plugin vous pouvez procéder ainsi :

```javascript
// exécute le plugin eedomus avec des paramètres, et enclenche le moteur de règles
SARAH.run('eedomus', { 'periphId' : id , 'periphValue' : value });
   
// exécute le plugin eedomus sans transmettre au moteur de règles
SARAH.call('eedomus', { 'periphId' : LUMENS}, function(options){ /* do next stuff */  });
```

### HTTP Functions

Liste des fonctions disponibles qui envoie une requête HTTP au client. Les requêtes sont envoyés en utilisant `SARAH.remote()`

| NodeJS           | Request          | Description    |
| ---------------- | ---------------- | -------------- |
| [SARAH.answer()](#SARAH_answer)   |  | Appelle SARAH.speak() avec des phrases prédéfinies |
| [SARAH.speak()](#SARAH_speak)	   | tts=...&sync=... | Fait parler SARAH (de façon synchrone ou asynchrone) |
| SARAH.shutUp()   | notts=...        | Arrête le discours de SARAH    |
| [SARAH.play()](#SARAH_play)	   | play=...&sync=...         | Lit un fichier.mp3 |
| [SARAH.pause()](#SARAH_pause)	   | pause=...        | Arrête la lecture du fichier.mp3 |
| SARAH.keyText()  | keyText=...      | Texte à taper |
| [SARAH.runApp()](#SARAH_runApp)   | run=...&runp=... | Chemin d'accès et paramètres d'une application à exécuter |
| SARAH.activate() | activate=...     | Application à passer au premier plan des fenêtres |
| SARAH.face()	   | face=...         | Démarre/arrête la reconnaissance faciale |
| SARAH.gesture()  | gesture=...      | Démarre/arrête la reconnaissance gestuelle |
| *les requêtes ci-dessous n'ont pas d'équivalent JavaScript*                                |
|                  | picture=...      | Prendre une photo |
|                  | height=...       | Retourne la taille de l'utilisateur [basé sur son avant bras](https://dl.dropboxusercontent.com/u/255810/Encausse.net/Sarah/skeleton.jpg) (value tts to speech) |
|                  | keyUp=...        | Toucher à presser |
|                  | keyDown=...      | Toucher à presser |
|                  | keyPress=...     | Toucher à presser |
|                  | keyMod=...       | Key modifier |
|                  | status=...       | Retourne "speaking" si SARAH est en train de parler |
|                  | recognize=...    | Effectue une reconnaissance vocale sur un fichier audio |
|                  | listen=...       | Démarre/arrête d'écouter |
|                  | context=...      | Active la grammaire de contexte |

### JSDocs

#### SARAH.exists(module)

**Paramètres**

* {String} module : nom du module/phantom

**Retourne**

Si le module est disponible, la fonction retourne `true`, sinon elle retourne `false`.

**Commentaires**

A partir de SARAH v2.8.

Exemple : pour vérifier si le plugin "freebox" est bien chargé, il faut utiliser `SARAH.exists("freebox")`.

#### SARAH.answer()

SARAH va dire une phrase aléatoire.

**Paramètres**

* Aucun paramètre

**Commentaires**

Cette fonction va choisir une phrase de façon aléatoire depuis le fichier `custom.prop`. Il est possible de changer les phrases par défaut en passant par [l'interface Web de SARAH](http://127.0.0.1:8080/home) en allant dans le widget "A props" et en cliquant sur le bouton "Config". Chaque phrase doit être séparée par un _pipe_ (|).

Les réponses par défaut sont `Oui|Je m'en occupe|Voilà|C'est fait`. Donc quand `SARAH.answer()` est appelée, le programme dira "Oui", ou "Voilà", ou "Je m'en occupe". La réponse est choisie de façon aléatoire.

#### SARAH.speak(sentence, [callback])

Fait parler SARAH de façon synchrone ou asynchrone.

**Paramètres**

* {String} Sentence : la phrase que SARAH va dire  
* {Function} [callback] : (optionnel) en asynchrone, c'est la fonction qui est appelée lorsque SARAH a fini de parler

**Commentaires**

Par défaut l'appel à la fonction est **synchrone** s'il n'y a pas de fonction _callback_. Exemple :
```javascript
SARAH.speak("Bonjour");
SARAH.speak("le monde");
SARAH.speak("Je suis SARAH");
```

Ces trois fonctions enverront 3 requêtes HTTP et seulement une sera lue par SARAH. La raison est que le TTS ignore les autres demandes tant que SARAH est en train de lire quelque chose.

A partir de SARAH v3.0 il est possible de changer ce comportement en appellant les fonctions en cascade (= asynchrone) :
```javascript
SARAH.speak("Bonjour", function(){
  SARAH.speak("le monde", function(){
    SARAH.speak("Je suis SARAH", function(){
      // ...
    })
  })
})
```

Il est aussi possible d'utiliser `SARAH.shutUp()` à n'importe quel moment pour qu'elle arrête de parler.

A noter qu'il est possible de connaître le statut de SARAH grâce à [http://127.0.0.1:8888/?status=true](http://127.0.0.1:8888/?status=true) : si cette adresse retourn `speaking` cela signifie que SARAH est en train de parler, sinon rien n'est retourné.

#### SARAH.play(file/url, [callback])

SARAH va lire un fichier MP3 ou WAV.

**Paramètres**

* {String} file : le chemin d'accès relatif vers un fichier MP3 ou WAV (par exemple `media/song.mp3`), ou vers une URL (par exemple `http://www.site.com/file.mp3`)
* {Function} [callback] : (optionnel) une fonction à appeler quand la lecture du fichier est terminée

**Commentaires**

Cette fonction va lire un fichier son. Les sons peuvent être mis en parallèle.
Cependant après 8 minutes (pour SARAH v3.1, ou 2 minutes for SARAH < v3.1) le fichier va s'arrêter d'être lu automatiquement.

Concernant les **fichiers WAV**, ils doivent être encodés en 88 kb/s (le codage 64 kb/s ne fonctionne pas).

#### SARAH.pause(file)

Met en pause la lecture d'un fichier audio.

**Paramètres**

* {String} file : le chemin d'accès relatif vers un fichier MP3 ou WAV (par exemple `media/song.mp3`), ou vers une URL (par exemple `http://www.site.com/file.mp3`)

**Commentaires**

Cette fonction permet d'arrêter la lecture d'un fichier audio.
Le paramètre `file` doit être le même que pour `SARAH.play()`.

#### SARAH.runApp({run, [runp]})

Exécute une application donnée.

**Paramètres**

* {Object} les options
  + {String} run : chemin d'accès vers le programme à exécuter
  + {String} [runp] : à utiliser pour passer des paramètres au programme appelé

**Commentaires**

Cette fonction appelle la fonction C# [Process.Start(processName, param)](http://msdn.microsoft.com/en-us/library/system.diagnostics.process.start.aspx).

Voici comment lancer un programme **côté client** :
```javascript
// Pour démarrer XBMC
SARAH.runApp('E:\\XBMC12\\XBMC.exe');

// Pour démarrer Spotify avec une musique
SARAH.runApp('C:\\Program Files (x86)\\Spotify\\spotify.exe', '"spotify:track:6ilfuI7O1vUfKf4TQ9fJRb"');

// ou avec Winamp
SARAH.runApp('C:\\Program Files (x86)\\Winamp\\winamp.exe', '"D:\\My Song.mp3"');
```

Si vous voulez lancer un programme **côté serveur** :
```javascript
exports.action = function(data, callback, config, SARAH) {
  // voir http://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
  var exec = require('child_process').exec;
  
  // remarque : on utilise des guillements (") dans les apostrophes (')
  // c'est parce qu'on utilise des espaces dans le chemin d'accès
  // pour un chemin relatif à SARAH vous pouvez utiliser %CD%
  // exemple : var process = '%CD%\\\\plugins\\\\myplugin\\\\bin\\\\xbmc.bat';
  var process = '"C:\\\\Program Files (x86)\\\\XBMC\\\\XBMC.exe"'; 
  var child = exec(process, function (error, stdout, stderr) {
    if (error !== null) console.log('exec error: ' + error);
  });

  callback({'tts': "Je lance XBMC."});
}
```

## Fonctionnalités avancées

SARAH fournit aussi des fonctionnalités avancées avec son API pour gérer le Context, le Profile, les Events, ...

### Context

Les plugins peuvent partager des données entre eux en utilisant `SARAH.context`. Par exemple, le plugin XBMC enregistre ses données dans `SARAH.context.xbmc`.

If you want to use it with your plugin, then make sure to use the syntax: `SARAH.context.{plugin}Name` (_{plugin}Name_ is the name of the folder used by your plugin) to avoid any conflicts.
Si vous voulez utiliser le contexte pour votre plugin, alors utiliser la syntaxe suivante : `SARAH.context.{plugin}Name` (_{plugin}Name_ étant le nom du répertoire où est votre plugin), et cela afin d'éviter des conflits entre les plugins.

Les données de contexte étant seulement enregistrées en mémoire (cela signifie que l'information est perdue à chaque redémarrage de SARAH), vous pouvez utiliser la fonction ci-dessous pour initialiser votre contexte :
```javascript
exports.init = function(SARAH) {
  SARAH.context.myPluginName = {"someVariable": "someValue"}
}
```

### Profile

La variable `SARAH.context.profile` contient les informations de profil pour chaque utilisateur. Exemple :

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

Un plugin peut communiquer avec d'autres plugins en utilisant [l'API Event Emitter](http://nodejs.org/api/events.html#events_class_events_eventemitter). Les plugins doivent alors écouter dans leur fonction `init()` :

Exemple avec le plugin XBMC qui écoute l'arrivée d'évènements :

```javascript
exports.init = function(SARAH){
  SARAH.listen('xbmc', function(data){
    // le code ici
  });
}
```

Et pour l'appeler depuis un autre plugin on utilisera :

```javascript
SARAH.trigger('xbmc', { key : value, x : 1, y : 2 });
```

**Remarque :** Un autre moyen de faire ça, sans code, est d'utiliser [le moteur de règles](#moteur-de-règles) `IF xbmc THEN DO {plugin}`.

### AskMe

Un plugin peut poser une question à l'utilisateur et selon la réponse effectuer une action différente :

```javascript
SARAH.askme(tts, grammar, timeout, callback);
```

| Argument         | Description                  |
| ---------------- | ---------------              |
| tts	           | La question à poser            |
| grammar          | les réponses attendues       |
| timeout          | délai (si > 0 alors la question est posée une seconde fois)   |
| callback         | la fonction qui est appelée avec la réponse qui a été comprise |

* Une grammaire dynamique est chargée côté client
* La grammaire est exclusive (un contexte est mis en place)
* Après le délai, la question est reposée
* S'il n'y a aucune réponse après `timeout x 2`, ou 8 secondes, alors la fonction de `callback` est appelée avec `false` en paramètre
* Les appels à AskMe sont empilés et mis en cache

**Exemple : Plugin 1**

```javascript
SARAH.askme("Quelle est ta couleur favorite ?", {
  "C'est le bleu" : 'bleu',
  "C'est le rouge" : 'rouge'
}, 10000, function(answer, end){
  // answer est la réponse comprise, c'est-à-dire "bleu" ou "rouge"
  SARAH.speak('Tu as répondu : ' + answer, function(){
      end(); // end() DOIT être appelé quand on a terminé ici
  });
});
```

**Concurrent Plugin 2**

Si Plugin 2 demande quelque en même temps que le plugin 1, alors la question est mise en attente.

```javascript
SARAH.askme("Quel est ta musique préférée ?", {
  "I feel good" : 'feelgood',
  "Highway to hell" : 'ACDC'
}, 10000, function(answer, end){
  SARAH.call('xbmc', { 'song' : answer }, function(options){ end(); }); // Penser à appeler end() !
});
```

### Chromeless

Un plugin peut afficher une page Web sur l'écran sans l'interface d'un navigateur :

```javascript
SARAH.chromeless(url, o, w, h, x, y)
```

| Argument         | Description        |
| ---------------- | ---------------    |
| url	           | URL à afficher     |
| o                | Browser's opacity  |
| w                | Browser's width    |
| h                | Browser's height   |
| x                | Browser's x   |
| y                | Browser's y   |

**Exemple**

```javascript
SARAH.chromeless('http://www.google.com', 80);
```

## Moteur de règles

Tout comme [https://ifttt.com/](https://ifttt.com/), SARAH est capable de déclencher une action basée sur des règles.

### Créer une règle

Utilisons un exemple pour comprendre le fonctionnement. Disons que l'on veut allumer des lumières (en utilisant le plugin `hue`) lorsqu'on met sur pause un film (en utilisant le plugin `XBMC`), et éteindre les lumières lorsqu'on regarde un film.

D'abord il faut créer une règle :

1. Ouvrir l'interface Web ([http://127.0.0.1:8080](http://127.0.0.1:8080))  
2. Aller dans `Règles` (menu de gauche)  
3. Dans la section "Modules", vous pouvez modifier une règle existante vide ou en créer une autre avec le bouton "Ajouter une règle".  
4. Sélectionner le plugin/module qui va déclencher une action ("If...")   
5. (Optionnel) Cliquer sur le mot "do" pour ajouter du code personnalisé  
6. Finalement, sélectionner le plugin qui va répondre à l'appel  

Il y a deux façons de gérer notre scénario exemple.

_Disclaimer_ : parce que c'est un exemple, le contenu XML des plugins `hue` et `xbmc` est ici factices.

#### Première façon

C'est la façon qui est recommandée.

Lorsqu'on crée une nouvelle règle, il est possible de cliquer sur le mot "do" (étape 5) pour ajouter du code personnalisé. C'est ce que nous allons faire ici.

Dans la boite qui s'ouvre vous pouvez utiliser l'objet `SARAH`, ainsi que `options` qui contient les données venant du premier plugin.

Tout d'abord, entrer le code ci-dessous dans la boite de "do" :
```javascript
console.log("[DEBUG] ",options);
```

Ensuite on exécute la commande souhaitée (par exemple `SARAH lance le film`) et on observe la fenêtre du serveur afin de trouver le contenu de l'objet `options`. Par exemple `options` va contenir :
```javascript
{
  action: 'lecture',
  target: 'film',
  body: {},
  _cmd: 'xbmc'
}
```

Et lorsqu'on met le film en pause avec `SARAH met le film sur pause` :
```javascript
{
  action: 'pause',
  target: 'film',
  body: {},
  _cmd: 'xbmc'
}
```

Bien, maintenant on regarde le contenu du fichier `hue.xml` pour trouver les paramètres utilisés. Par exemple le contenu XML ressemble à :
```xml
 <item repeat="0-1">
    <one-of>
      <item>allumer toutes les lumières <tag>out.action.turnOn="true";out.action.allLights="true";</tag></item>
      <item>éteindre toutes les lumières <tag>out.action.turnOn="false";out.action.allLights="true";</tag></item>
	  </one-of>
  </item>
```

Deux paramètres sont utilisés : `turnOn` (égal à `"true"` pour allumer et à `"false"` pour éteindre) et `allLights` (égal à `"true"`).

Donc maintenant on peut changer le code de la boite "do" avec celui-ci :
```javascript
// si la commande "SARAH lance le film"
if (options.action=="lecture" && options.target=="film") {
  // alors éteindre les lumières
  options.turnOn="false";
  options.allLights="true";
} else {
  // si la commande "SARAH met le film sur pause"
  if (options.action=="pause" && options.target=="film") {
    // alors on rallume
    options.turnOn="true";
    options.allLights="true";
  }
}
```

Il faut s'assurer de bien enregistrer les règles et SARAH devrait maintenant réagir et éteindre/allumer les lampes selon qu'on lit/arrête un film.

#### Seconde façon

La seconde facçon consiste à éditer le fichier XML.

On regarde d'abord le contenu du fichier `hue.xml` pour voir les paramètres qui sont passés pour allumer/éteindre :

```xml
 <item repeat="0-1">
    <one-of>
      <item>allumer toutes les lumières <tag>out.action.turnOn="true";out.action.allLights="true";</tag></item>
      <item>éteindre toutes les lumières <tag>out.action.turnOn="false";out.action.allLights="true";</tag></item>
	  </one-of>
  </item>
```

Deux paramètres sont utilisés : `turnOn` (égal à `"true"` pour allumer et à `"false"` pour éteindre) et `allLights` (égal à `"true"`).

On regarde maintenant le contenu du fichier `xbmc.xml` pour trouver la partie qui nous intéresse :
```xml
	<rule id="ruleXBMC" scope="public">
		<tag>out.action=new Object();</tag>
		<one-of>
			<item>lance le film<tag>out.action.action="lecture"; out.action.target="film";</tag></item>
			<item>mets le film sur pause<tag>out.action.action="pause"; out.action.target="film";</tag></item>
		</one-of>
	</rule>
```

Et, enfin, on ajoute les paramètres de `hue` dans le fichier `xbmc.xml` qui va alors ressembler à :
```xml
	<rule id="ruleXBMC" scope="public">
		<tag>out.action=new Object();</tag>
		<one-of>
			<item>lance le film<tag>out.action.action="play"; out.action.target="film"; out.action.turnOn="false"; out.action.allLights="true";</tag></item>
			<item>mets le film sur pause<tag>out.action.action="pause"; out.action.target="film"; out.action.turnOn="true"; out.action.allLights="true";</tag></item>
		</one-of>
	</rule>
```

On a ajouté `out.action.turnOn="false"; out.action.allLights="true";` pour éteindre les lumières lorsqu'on lance un film, et `out.action.turnOn="true"; out.action.allLights="true";` pour les allumer quand on le met sur pause.

Du au fait qu'on a défini une règle, les `out.action` de `xbmc` sont transmis au plugin `hue`.

### Remarque

Faire attention à ce qui est en cours de vocalisation : si SARAH est en train de parler (dû au plugin "If"), alors elle ne pourra pas parler(dans le plugin "then") en même temps.

### Autres filtres

Vous pouvez exécuter une règle avant ou après chaque appel d'un plugin.
C'est exactement la même chose que pour le système de règles de "Modules", sauf que vous n'avez pas besoin de choisir un plugin "If".
