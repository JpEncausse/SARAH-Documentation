# Plugin Development

**This is for SARAH v3**

You'll find here how to create a plugin.

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

Instead of hosting your plugin on GitHub you can simply send a ZIP file to `sarah.project [a] encausse.net` (see below).

### Content of the ZIP file

If you host the ZIP file on GitHub, then the limit size is 10Mo.

Rules to follow to create the ZIP file:
* The plugin name must be in lower case, without any blank space (e.g. "xbmc" or "freebox" or "messagetohome")
* Try to find a name that is relevent and obvious enought
* You must directly select the files of your plugins and zip them (you must **not** select the folder, but only the files inside the folder to create the archive)
* **Github**: the ZIP file must be moved to `/build/` and named as `{name}-release.zip` (with `{name}` is your plugin name in lower case)

### Publishing

For the plugin to be included into the store, you need to go to [http://marketplace.sarah.encausse.net/](http://marketplace.sarah.encausse.net/) then sign in and add a new plugin.
