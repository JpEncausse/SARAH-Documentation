# Développement de plugin

SARAH v4 est une version en cours de développement. Réécriture complète du client et du serveur pour plus de modularité.

Merci d'aller sur la page dédiée à [SARAH v3](plugin_dev_v3) si vous développez sur SARAH v3.

Dans les exemples le nom du plugin sera `sample` ou `{plugin}`.

## Sommaire

## Multilangue

SARAH v4 améliore le multilinguisme côté serveur et côté client. Par default le site ne propose que 2 drapeaux de langue EN et FR. 

Le moteur de reconnaissance vocale ne marche QUE dans une langue définie dans `custom.ini`:
```
; Speech engine language
language=fr-FR
```

### Server

Chaque plugin peut fournir ses fichier de langue dans le répertoire `sample/locales/{lang}.js` sous la forme d'un JSON

```json
{
  "plugin.sample.hello" : "Hello %s !",
  "plugin.sample.the"   : "the",
  "plugin.sample.world" : "World"
}
```

La fonction `i18n()` permet de résoudre la langue. Cette fonction est accessible depuis le code et toutes les interfaces.
Cette fonction peut prendre des paramètres qui seront alors interprétés par la le `%s`.

```html
<div>
  <h1><%- i18n('plugin.sample.hello', name) -%></h1>
</div>
```

Il est donc possible de faire des réponses multilingues:

```javascript
exports.action = function(data, next){
  SARAH.speak(i18n('plugin.sample.the'));
  next({'tts': i18n('plugin.sample.world')});
}
```


### Client

Chaque plugin peut fournir des grammaires multilangues. Le nom de fichier doit contenir la locale: `sample_en_US.xml`. 
La déclaration XML aussi:

```xml
<grammar version="1.0" xml:lang="en-US" mode="voice"  root="ruleTime" xmlns="http://www.w3.org/2001/06/grammar" tag-format="semantics/1.0">
  <rule id="ruleTime" scope="public">
  ...
  </rule>
</grammar>
```

## Web

### Portlet

TBD.

### Page

Un plugin peut avoir sa propre page accessible depuis: `http://127.0.0.1:8080/plugin/sample/sample.ejs`

```html
<% layout('/layout/page.ejs') %>

<% /* Optional for Ajax & Bootstrap stuff */ %>
<% sidebar = SARAH.PortalManager.SIDEBAR %>
<% script('/sarah/js/layout.js') %>
<% stylesheet('/sarah/less/component.css') %>

Hello World

```

### Modal

Un plugin peut ouvrir des boites modale depuis un lien.

```html
<a href="/plugin/sample/modal/sampleModal.ejs?title=plugin.sample.title -%>" data-action="modal" class="btn btn-default" >
  <span class="glyphicon glyphicon-cog"></span>
</a>
```

La page `sampleModal.ejs` utilise un template `modal-form` ou `modal` utilisant des paramètres `block()`

```html
<% layout('/layout/modal-form.ejs') -%>
<% block('formUrl', '/plugin/sample/modal/sampleModal.ejs'); %>
<% block('title',   'plugin.sample.name') %>
<% 
  var param1 = req.query.param1 || req.body.param1;
  var param2 = req.query.param2 || req.body.param2;
%>

<%- partial(SARAH.ConfigManager.VIEW+'/layout/field.ejs', { field: {  'name' : 'param1', 'label' : 'plugin.sample.param1', 'value' : param1 }}) -%>
<%- partial(SARAH.ConfigManager.VIEW+'/layout/field.ejs', { field: {  'name' : 'param2', 'label' : 'plugin.sample.param2', 'value' : param2 }}) -%>
```

Le partial `field.ejs` génère le HTML pour afficher un champs de formulaire responsive. Le formulaire est soumis en POST en Ajax. L'idée étant de traiter les paramètres dans la page `sampleModal.ejs`.

```html
<% var param1 = req.query.param1 || req.body.param1; %>

<% if (...){ %><% block('message', 'plugin.sample.error1'); %>
<% }  else { %><script>$('#sarah-modal').modal('hide');</script><% } %>
```
