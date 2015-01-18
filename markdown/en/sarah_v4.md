# Dedicated page for SARAH v4

_work in progress_

## Getting Started

## FAQ

## Plugin Development

We'll see here the things that are different from SARAH v3.

### Global variables

No need to pass `SARAH` and `Config` anymore: they are now global variables.

### Differences with version 3

#### exports.action(data, next)

With v3, the function had **four** parameters: `exports.action(data, callback, config, SARAH)`.  
With v4, the function has **only two** parameters: `exports.action(data, next)`

From now on `config` is a global variable known as `Config`, and `SARAH` becomes also a global variable.

`callback` is now called `next`, but its role is identical.

### How To

#### How to save a variable into the {plugin}.prop file

It's possible to save a variable directly into the `{plugin}.prop` file:

```javascript
exports.action = function(data, next) {
  // `Config` is a global variable
  // use `Config.modules.{plugin}` to access to the properties defined into the `{plugin}.prop` file
  // and you can also define a variable that will be saved in it:
  Config.modules.{plugin}.myVariable = 123;
  // use `SARAH.ConfigManager.save()` to modify the `{plugin}.prop` file
  SARAH.ConfigManager.save();
  
  next({'tts': "File saved"});
}
```
