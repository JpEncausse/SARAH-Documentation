# Page dédiée pour SARAH v4

_en travaux_

## Premiers Pas

## FAQ

## Développement de plugin

Nous verrons ici les choses qui varient par rapport à SARAH v3.

### Variables globales

Il n'est plus besoin de passer `SARAH` et `Config` : ils sont devenus des variables globales.

### Différences avec la v3

#### exports.action(data, next)

En v3, la fonction avait **quatre** paramètres : `exports.action(data, callback, config, SARAH)`.  
En v4, la fonction a **seulement deux** paramètres : `exports.action(data, next)`

Dorénavant `config` est une variable globale connue sous le nom `Config`, et `SARAH` devient aussi une variable globale.

`callback` est appelé `next`, mais son rôle est identique.

### Comment faire

#### Comme enregistrer une variable dans le fichier {plugin}.prop

Il est possible de sauvegarder une variable dans le fichier `{plugin}.prop` :

```javascript
exports.action = function(data, next) {
  // `Config` est une variable globale
  // utiliser `Config.modules.{plugin}` pour accéder aux propriétés de `{plugin}.prop`
  // et vous pouvez aussi définir une variable à sauvegarder
  Config.modules.{plugin}.myVariable = 123;
  // utiliser `SARAH.ConfigManager.save()` pour modifier le fichier `{plugin}.prop`
  SARAH.ConfigManager.save();
  
  next({'tts': "Fichier sauvegardé"});
}
```
