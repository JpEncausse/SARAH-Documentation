# Page dédiée pour SARAH v4

_en travaux_

## Premiers Pas

### Configuration

La configuration doit être définie dans le fichier `client/config.ini`. De nombreux nouveaux paramtères sont disponibles et peuvent être trouvés dans les fichiers `client/AddOns/{addon}/addon.ini`.

Ne changez pas le contenu des fichiers `addon.ini` directement, mais prenez ce qui vous intéresse et placez le dans le fichier `config.ini` plutôt.

#### client/config.ini

Les paramètres sont regroupés par **section**.

##### Comment activer le Kinect ?

Vous devez avoir le code ci dessous dans votre fichier `config.ini` :
```
; on utilise [kinect_v1] pour définir une section
; tous les paramètres de cette section peuvent être trouvés dans `client/AddOns/kinect_v1/addon.ini`
[kinect_v1]
; on utilise "enable=true" pour activer le Kinect v1
enable=true

; Confidence of recognition (from 0 to 1)
; on peut spécifier le niveau de reconnaissance pour le Kinect v1
confidence=0.30

[kinect_v1.speech]
; ici on peut définir que l'on veut UNIQUEMENT la reconnaissance vocale
; donc quand c'est à `true` alors la reconnaissance faciale et gestuelle sont désactivées
speech_only=true

; on entre maintenant dans la section [kinect_v2]
[kinect_v2]
; si vous n'avez pas de Kinect v2 alors il faudra mettre `enable=false`
enable=false

; on entre maintenant dans la section [microphone]
[microphone]
; si vous avez un Kinect alors il faut mettre `enable=false` ici sinon la reconnaissance vocale fonctionnera mal
; mais si vous n'avez pas de Kinect alors il faudra mettre `enable=true`
enable=false
```

## FAQ

## Développement de plugin

Nous verrons ici les choses qui varient par rapport à SARAH v3.

### Variables globales

Les variables `SARAH`, `Config` et `Profile` sont devenues des variables globales. Elles sont accessibles depuis n'importe quel code JavaScript ou page EJS. 

La variable `SARAH` donne accès à l'ensemble de l'API. Par exemple :
```javascript
SARAH.speak('bonjour');
SARAH.ConfigManager.save();
```

#### Debug

Les fonctions `debug()`, `log()`, `info()`, `warn()` et `error()` sont des fonctions globales. Elles permettent de loguer de l'information n'importe où dans le code JavaScript. Par exemple :
```javascript
var variable = {'key':'value'};
info('une trace %s très importante', 'vraiment', variable);
```

#### Multilangues

La fonction `i18n()` est une fonction globale. Elle permet de traduire une clé de langue dans n'importe quel code JavaScript ou page EJS.

```javascript
// 'portal.hello' est le nom de la variable, ça sera "Hello " ou "Bonjour " ou "Hola " par exemple
var message = i18n('portal.hello', 'John');
info(message);
```

Les fichiers de localisation se trouve dans `server/app/locales/{lang}.js` et dans `plugins/{plugin}/locales/{lang}.js`

### Différences avec la v3

#### exports.action(data, next)

En v3, la fonction avait **quatre** paramètres : `exports.action(data, callback, config, SARAH)`.  
En v4, la fonction a **seulement deux** paramètres : `exports.action(data, next)`

Dorénavant `config` est une variable globale connue sous le nom `Config`, et `SARAH` devient aussi une variable globale.

`callback` est appelé `next`, mais son rôle est identique.

### Comment faire

#### Comme modifier les variable du {plugin}.prop

Les variables du `{plugin}.prop` peuvent être modifiéé depuis l'interface web. Elle sont alors stockées dans le `custom.prop`. Il est possible de faire cette action programatiquement:

```javascript
exports.action = function(data, next) {
  // Modifier la configuration en mémoire
  Config.modules.{plugin}.myVariable = 123;
  
  // Enregistrer la configuration (dans le custom.prop)
  SARAH.ConfigManager.save();
  
  next({'tts': "Fichier sauvegardé"});
}
```
