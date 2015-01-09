# FAQ / Résoudre un problème

## Sommaire

* [Comment faire](#comment-faire)
  + [Comment aider ?](#comment-aider)
  + [Comment trouver quelqu'un pour m'aider ?](#comment-trouver-quelquun-pour-maider)
  + [Comment prendre une photo avec un Kinect ?](#comment-prendre-une-photo-avec-un-kinect)
  + [Comment utiliser un QRCode?](#comment-utiliser-un-qrcode)
  + [Comment supprimer un profil de reconnaisse vocale ?](#comment-supprimer-un-profil-de-reconnaissance-vocale)
  + [Comment séparer SARAH serveur et client entre deux ordinateurs ?](#comment-séparer-sarah-serveur-et-client-entre-deux-ordinateurs)
* [Questions diverses](#questions-diverses)
  + [Quels sont les requis ?](#quels-sont-les-requis)
  + [Que signifie SARAH ?](#que-signifie-sarah)
  + [Quelles langues parle SARAH ?](#quelles-langues-parle-sarah)
* [Problèmes liés aux plugins](#problèmes-liés-aux-plugins)
  + [Le plugin ne s'installe pas](#le-plugin-ne-sinstalle-pas)
  + [Le serveur retourne une erreur](#le-serveur-retourne-une-erreur)
  + [Je n'arrive pas à le configurer](#je-narrive-pas-à-le-configurer)

## Comment faire

### Comment aider ?

* Parler de SARAH sur les réseaux sociaux et sur les blogs
* Montrer SARAH à ses amis
* Créer des plugins

### Comment trouver quelqu'un pour m'aider ?

Chercher de l'aide sur le [groupe Google+](https://plus.google.com/u/0/communities/105964514508504667709).

### Comment prendre une photo avec un Kinect ?

Voici les différentes étapes :  

1. éditer le fichier `custom.ini` et avoir la valeur `only=false`  
2. redémarrer SARAH (vous ne devez pas utiliser le fichier `Client_Kinect_Audio`)  
3. cliquer-droit sur l'icône de SARAH (la maison près de l'horloge) et choisir "Kinect_0" ; cela vous donne accès aux fonctions avancées (camera/motion/gesture/recognition)
4. prendre une photo en appellant l'adresse [http://127.0.0.1:8888/?picture=true](http://127.0.0.1:8888/?picture=true) (la photo apparaitra dans le navigateur et sera enregistré dans le répertoire `medias/` de SARAH)

### Comment utiliser un QRCode ?

Il est possible de montrer un QRCode au Kinect de SARAH. Cela aura pour effet d'enclencher une action :

1. Créer un QRCode à partir du site [ZXing](http://zxing.appspot.com/generator) : le QRCode doit représenter l'URL de l'action d'un plugin (par exemple [http://127.0.0.1:8080/sarah/parle?phrase=Bonjour](http://127.0.0.1:8080/sarah/parle?phrase=Bonjour) pour le plugin `parle`)  
2. Imprimer le QRCode  
3. Montrer le QRCode au Kinect (+/- 80cm)

### Comment supprimer un profil de reconnaisse vocale ?

Ce n'est pas toujours bon d'avoir suivi le tutoriel de reconnaissance vocale trop souvent. Si SARAH ne vous comprend plus correctement vous pouvez essayer d'effacer votre profil de reconnaissance vocale :    
Aller dans `Panneau de Configuration` ➜ `Reconnaissance Vocale` ➜ `Options vocales avancées` ➜ `Profils de reconnaissance vocal` ➜ `Supprimer...`

### Comment séparer SARAH serveur et client entre deux ordinateurs ?

_à compléter_

## Questions diverses

### Quels sont les requis ?

Le système d'exploitation est Windows (Windows 7, 8, 8.1 en 32 ou 64bit), mais cela devrait aussi fonctionner avec une machine virtuelle Windows sous Linux et MacOS.

Vous devez posséder un microphone, ou un Kinect. Le Kinect est bien meilleur pour la reconnaissance vocale, et fournit aussi des fonctionnalités supplémentaires (_gesture, face recognition, QRCode, ..._).
Si vous voulez utiliser SARAH avec un Kinect, merci de lire les informations ci-dessous :
* Kinect 1 pour XBox360
  * Peu cher (~40€)
  * Il doit être fourni avec le câble USB et l'alimentation
  * D'après la licence il ne peut être utilisé que par les développeurs (c'est donc le cas avec SARAH)
* Kinect 1 pour Windows
  * Plus cher
* Kinect 2 pour Windows
  * Très cher
  * Encore en version béta

Et finalement vous aurez aussi besoin d'une connexion Internet.

En ce qui concerne le _hardware_, le programme pourrait être lent sur un processeur peu puissant.

### Que signifie SARAH ?

S.A.R.A.H. signifie _Self Actuated Residential Automated Habitat_ et ce nom vient de la série TV _Eureka_.

### Quelles langues parle SARAH ?

SARAH supporte plusieurs langues mais, pour le moment, nous sommes concentrés sur l'**anglais** et le **français**.
Cependant SARAH ne peut fonctionner qu'avec une seule langue à la fois, qui doit être définie dans le fichier `custom.ini`.

La langue par défaut pour SARAH est l'anglais, donc soyez sûr de [suivre les instructions](#getting_started) pour installer le pack de langues.

Pour le moment la plupart des plugins sont pour la langue française.

## Problèmes liés aux plugins

### Le plugin ne s'installe pas

C'est un bug dû à Github.

* Retenter plusieurs fois l'installation
* Ou essayer d'installer manuellement le plugin qui s'est téléchargé dans le répertoire `/temp/` de SARAH

### Le serveur retourne une erreur

Si un le message d'erreur `module not found` apparait dans la fenêtre du serveur c'est que le plugin ne fonctionne pas (soit un problème avec le fichier JavaScript `.js` ou le fichier de configuration `.prop`). Essayer de contacter le développeur du plugin.

### Je n'arrive pas à le configurer

* Il y a un bug connu avec Internet Explorer, Firefox et d'autres... Dans ce cas, essayer avec Google Chrome.
* Certains _touch devices_, comme le LeapMotion, peuvent créer un conflit dans le portail vis à vis du _glisser-déposer_.
