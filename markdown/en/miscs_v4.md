
## Getting Started

If you have a **login/password** requested when you're going to your local SARAH Web interface, then try **admin** for both.

### Configuration

The configuration must be defined into the `client/config.ini` file. Several new parameters are available and can be found into the `client/AddOns/{addon}/addon.ini` files.

Don't change the `addon.ini` but copy the parameters you want from it to the `config.ini` file instead.

#### client/config.ini

The parameters are grouped by **section**.

##### How to activate the Kinect?

You should have the below code in your `config.ini` file:
```
; we use [kinect_v1] to define a new section
; all parameters tied to this section can be found into `client/AddOns/kinect_v1/addon.ini`
[kinect_v1]
; we use "enable=true" to activate the Kinect v1
enable=true

; Confidence of recognition (from 0 to 1)
; we can specify the recognition level for Kinect v1
confidence=0.30

[kinect_v1.speech]
; here we define that we ONLY want to use the speech recognition
; so when it's `true` then the face and gesture recognition are disabled
speech_only=true

; we now enter in the [kinect_v2] section
[kinect_v2]
; if you don't own a Kinect v2 then make sure to set `enable=false`
enable=false

; we now enter in the [microphone] section
[microphone]
; if you use a Kinect you have to set `enable=false` otherwise the voice recognition won't work correctly
; but if you don't have a Kinect then it should be `enable=true`
enable=false
```

## FAQ

## Plugin Development

We'll see here the things that are different from SARAH v3.

### Global variables

Variables `SARAH`, `Config` and `Profile` are now globals. They are available anywhere in JavaScript code or EJS pages. 

The variable `SARAH` is a singleton that proxy all the API. For example: 
```javascript
SARAH.speak('hello');
SARAH.ConfigManager.save();
```
#### Debug

Functions `debug()`, `log()`, `info()`, `warn()` and `error()` are now globals. They are available anywhere in  JavaScript code. They can be called to log some information.

```javascript
var variable={'key':'value'};
info('a trace %s accurate', 'very', variable);
```

#### Multilang

The `i18n()` function is now global and available anywhere in JavaScript code or EJS pages. It translates a lang key to the correct language.

```javascript
// 'portal.hello' could be "Hello " or "Bonjour " or "Hola "
var message = i18n('portal.hello', 'John');
info(message);
```

Localized files are stored in `server/app/locales/{lang}.js` and in `plugins/{plugin}/locales/{lang}.js`.

### Differences with version 3

#### exports.action(data, next)

With v3, the function had **four** parameters: `exports.action(data, callback, config, SARAH)`.  
With v4, the function has **only two** parameters: `exports.action(data, next)`

From now on `config` is a global variable known as `Config`, and `SARAH` becomes also a global variable.

`callback` is now called `next`, but its role is identical.

### How To

#### How to update a {plugin}.prop variable

Variable defined in the `{plugin}.prop` can be edited in the portal. Update is saved in `custom.prop`. This action can also be performed in code:

```javascript
exports.action = function(data, next) {
  // Update in memory configuration
  Config.modules.{plugin}.myVariable = 123;
  
  // Save configuration (in custom.prop)
  SARAH.ConfigManager.save();
  
  next({'tts': "File saved"});
}
```