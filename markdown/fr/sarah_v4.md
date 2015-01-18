# Page dédiée pour SARAH v4

_en travaux_

## Premiers Pas

## FAQ

## Développement de plugin

Nous verrons ici les choses qui varient par rapport à SARAH v3.

### Variables globales

Les variables `SARAH`, `Config` et `Profile` sont devenues des variables globales. Elles sont accessibles depuis n'importe quel code JavaScript ou page EJS. 

La variable SARAH donne accès à l'ensemble de l'API
```javascript
  SARAH.speak('bonjour');
  SARAH.ConfigManager.save();
```

#### Debug

Les fonctions `debug()`, `log()`, `info()`, `warn()`, `error()` sont des fonction globales. Elle permettent de loguer de l'information n'importe ou dans le code JavaScript

```javascript
  info('une trace %s très importante', 'vraiment', { 'key' , 'value' });
```

#### Multilangue

La fonction `i18n()` est une fonction globale. Elle permet de traduire une clef de langue dans n'importe quel code JavaScript ou page EJS.

```javascript
  var message = i18n('portal.hello', 'John');
  info(message)
```

Les fichiers de localisation se trouve dans `server/app/locales/{lang}.js` et dans `plugins/MonPlugin/locales/{lang}.js`

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
