# Développement de plugin

**Cette documentation est faite pour SARAH v3 seulement**

## Structure des fichiers

Il y a quatre fichiers principaux (`yourplugin` doit être remplacé par le nom en minuscules de votre plugin) :

* `yourplugin.prop` : fichier qui définit votre plugin (comme la version, l'auteur, les paramètres de l'utilisateur, ...)
* `yourplugin.xml` :  fichier XML principal qui doit contenir la grammaire (commandes vocales)
* `index.html` : la documentation relative à votre plugin
* `yourplugin.js` (optionnel) : le fichier JavaScript de votre plugin qui gère les fonctions avancées

## Contenu des fichiers

### yourplugin.prop

Le contenu de ce fichier a une structure JSON de type :
````xml
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
````

Remplacer `yourplugin` avec le nom en minuscules de votre plugin.

Vous pouvez définir des paramètres d'utilisateur dans ce fichier. Remplacer `user_setting1` par les données comme `server_ip_address` ou `key_code` ou autre. Vous pouvez aussi ajouter d'autres paramètres si nécessaire.

### yourplugin.xml

Ce sont les commandes de grammaire/vocales de votre plugin.

````xml
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
````

Dans le code vous trouverez trois fois "Yourplugin" ou "yourplugin". Il suffit de remplacer par le nom de votre plugin (voir exemple).

* `<item>Sarah</item>` doit être inchangé : le programme va automatiquement changer "Sarah" par le nom défini dans la configuration (si, par exemple, SARAH est appelée Jarvis, alors vous devez laisser "Sarah" dans le fichier XML).
* `out.action._attributes.tts` est utilisé pour synthétiser directement la phrase.
* `out.action.myParam` : vous pouvez remplacer `myParam` par ce que vous voulez et ensuite l'utiliser dans le fichier JavaScript.
* `Switch on the magic` : SARAH exécutera la commande entre les `<tag>...</tag>` lorsque vous prononcerez `SARAH allume la magie`

### index.html

_à completer_

### yourplugin.js

_à completer_

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
