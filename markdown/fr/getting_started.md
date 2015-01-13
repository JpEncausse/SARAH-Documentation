# Premiers Pas

Cette page est seulement pour **SARAH v3**. Merci d'aller sur la page dédiée à [SARAH v4](sarah_v4) si vous testez cette nouvelle version.

## Sommaire

* [Installation](#installation)
  + [Windows](#windows)
  + [Kinect v1](#kinect-v1)
  + [Kinect v2](#kinect-v2)
* [Configuration](#configuration)
  + [Récupérer une Google API Key](#récupérer-une-Google-API-Key)
  + [config.ini](#config.ini)
* [Démarrer](#démarrer)
* [Plugins](#plugins)
  + [Installation](#installation)
  + [Configuration Plugins](#configuration-plugins)
  + [Utilisation](#utilisation)
* [Mise à jour de SARAH](#mise-à-jour-de-sarah)

## Installation

### Windows

Ci-dessous les différentes étapes :

1. Télécharger et installer [.Net 4.5 Framework](http://www.microsoft.com/fr-fr/download/details.aspx?id=30653)

2. Télécharger et dézipper [SARAH](http://encausse.net/s-a-r-a-h/)   
  ➔ Lorsque vous dézippez le package de SARAH il faut vous assurer de **ne pas avoir d'espaces dans le nom du chemin d'accès**. Par exemple SARAH pourra se trouver dans `C:\SARAH\` mais pas dans `C:\Chemin avec des espaces\SARAH\`

3. (optionnel) [Installer une voix TTS](http://encausse.wordpress.com/2013/05/23/sarah-joshua-jarvis-yuri-et-les-autres/) ou utiliser la voix par défaut de Windows 8      
  ➔ On recommande [la voix de Virginie](http://www.ac-limoges.fr/ia87/spip.php?article315) qui est très bien.   
  ➔ En cas de problèmes, merci de consulter la [FAQ](faq)

4. Si vous avez un **Kinect** merci de [suivre les instructions ci-dessous](#kinect-v1) afin de pouvoir l'utiliser.

Après toutes ces étapes SARAH est prête [à être configurée](#configuration).

### Kinect v1

Le Kinect de la Xbox 360 peut être acheté séparément. Ce dispositif est très puissant et bien meilleur qu'un microphone ordinaire. Si vous en achetez un **assurez-vous qu'il est livré avec le câble USB et son adaptateur**.

Ci-dessous les instructions pour installer le Kinect v1 sous Windows :

1. Télécharger et installer [Kinect SDK v1.8](http://www.microsoft.com/en-us/download/confirmation.aspx?id=40278)
2. Télécharger et installer le [Language Pack](http://www.microsoft.com/en-us/download/details.aspx?id=34809) (au moment du téléchargement il faudra bien choisir "FR-fr" pour la langue)

Quelques remarques à propos de l'installation d'un Kinect :
* Ne pas utiliser d'USB 3 sinon le microphone du Kinect ne fonctionnera pas,
* Si vous utilisez plusieurs Kinects et que vous voulez vous servir de la vidéo, alors il faut utiliser deux ports USB différents, sinon une seule vidéo fonctionnera dû à un problème de bande passante (mais du coup si vous n'utilisez que le microphone vous pouvez utiliser le même port).

### Kinect v2

Ci-dessous les instructions pour la deuxième génération de Kinect :

1. Télécharger et installer [Kinect SDK v2](http://www.microsoft.com/en-us/download/details.aspx?id=44561)
2. Télécharger et installer [language packs v2](http://www.microsoft.com/en-us/download/details.aspx?id=43662) (au moment du téléchargement il faudra bien choisir "FR-fr" pour la langue)

## Configuration

Si vous souhaitez que SARAH fonctionne bien, il faut utiliser un bon micro. Dans [cet article](http://encausse.wordpress.com/2013/05/19/thevoice/) trois microphones (Microhpone, Kinect et VoiceTracker II) ont été testés avec SARAH.

Ci-dessous les prochaines étapes à suivre :

1. Aller dans le répertoire `profile/` et effacer le fichier `profile.json` (sinon SARAH risque de vous appeler _Jean-Philippe_ de temps en temps !)
2. Récupérer une Google API Key ([voir ci-dessous](#récupérer-une-google-api-key))
3. Regarder les différents paramètres disponibles dans le fichier `config.ini`
4. Change le volume d'entrée du son : aller dans ➔ `Panneau de Configuration` ➔  Chercher `Gérer les périphériques audio` ➔  `Clique droit sur votre microphone` ➔  Cliquer sur `Propriétés` ➔  `Change le niveau` (par exemple, pour un microphone classique, ce doit être ~80, et pour un Kinect, il faut tenter plusieurs configurations)
5. Entrainer la reconnaissance vocale de Windows : aller dans ➔  `Panneau de Contrôle` ➔  `Reconnaissance vocale` ➔ `Suivre les dictatiels de reconnaissance vocale` (attention : avec un microphone classique il ne faut pas faire ce dictaciel plus d'une fois)

### Récupérer une Google API Key

La _Google API Key_ est nécessaire pour plusieurs plugins.

Merci de suivre attentivement les différentes étapes décrites ci-dessous (instructions provenant du site [http://www.chromium.org/developers/how-tos/api-keys](http://www.chromium.org/developers/how-tos/api-keys))

**1) S'enregistrer sur le Google Group chromium :**

* S'assurer d'être un membre de chromium-dev@chromium.org (vous pouvez souscrire à chromium-dev et choisir de ne pas recevoir d'emails). Pour cela, se rendre à l'adresse [https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev](https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev)
* Puis cliquer sur « _Join the group to send a message_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_1.png)

* Choisir « _Do not send updates by email_ »
* Cliquer sur « _Join the group_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_2.png)

**2) Créer une console app sur Google**

* Se rendre sur [https://cloud.google.com/console](https://cloud.google.com/console)
* Click on « _Create Project_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_3.png)

* Donner un nom
* Accepter the _Terms of Use_
* Cliquer sur le bouton « _Create_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_4.png)

**3) Activer Speech API**

* Aller dans « _APIs & Auth > APIs_ » à partir du menu à gauche
* Dans **Browse API** chercher « _Speech API_ »
* Cliquer sur « _Speech API_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_5.png)

* Activer la clé

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_6.png)

* Accepter les _terms of use_

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_7.png)

**5) Créer sa clé « Speech API »**

* Aller dans « _APIs & Auth > Credentials_ » à partir du menu à gauche
* Cliquer sur le bouton « _Create New Key_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_8.png)

* Cliquer sur le bouton « _Browser key_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_9.png)

* Cliquer sur le bouton « _Create_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_10.png)

* Votre _API key_ :

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_11.png)

**6) Intégration dans SARAH**

* Ouvrir le fichier de configuration de SARA (`custom.ini`) situé à la racine du répertoire d'installation de SARAH
* Chercher la ligne `Google Speech Key API see https://console.developers.google.com/`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_12.png)

* Modifier la ligne `;google=` :
  + supprimer le point-virgule `;` au début de la ligne
  + ajouter la clé API juste après le égal `=`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_13.png)

Remarque : cette clé est **pour votre usage exclusive et ne doit pas être utilisée par d'autres personnes**. 

### config.ini

Tous les paramètres de configuration de SARAH sont disponibles dans le fichier `config.ini`.

Ci-dessous une liste de quelques uns de ces paramètres

#### SARAH

```
; Hot replace SARAH name
; dans les fichiers XML (utilisé pour la reconnaissance vocale) il faut utiliser le mot clé SARAH
;   cependant on peut vouloir changr le nom par défaut en quelque chose d'autre, par exemple en JARVIS
;   pour ce faire on va laisser "SARAH" dans les fichiers XML, et dans le fichier config.ini on va changer
;   le SARAH ci-dessous en JARVIS, et ça va fonctionner
name=SARAH

; Speech engine language
; Le langage par défaut à utiliser
language=fr-FR

; Restart engine every X millisecond (1000 x 60 x 60 = 3600000 = 1 hour)
restart=3600000

; La confidence sur le premier mot (c'est-à-dire sur "SARAH")
; Le premier mot ("SARAH") devrait avoir une confidence haute afin d'éviter les faux positifs
; de 0 à 1
trigger=0.8

; La confidence pour le reste de la phrase peut être plus faible que celle du 1er mot
; de 0 à 1
confidence=0.70
```

```
; Reset grammar to default after given timeout (millis)
; Quand une grammaire de contexte (lazy) est chargé,
;   alors SARAH SARAH attendra `ctxTimeout` millisecondes avant de la décharger automatiquement
;   voir la page sur le Développement de Plugin pour plus d'informations
ctxTimeout=60000
```

```
[directory]
; Path to XML Grammar directories
directory1=macros 
directory2=plugins
```

#### Speaker Manager

Le client C# utilise un Speaker Manager pour faire le Text to Speech (TTS) et jouer des musiques.

```
; La voix à utiliser pour SARAH
; vous pouvez appeler l'URL http://127.0.0.1:8888/?tts=test pour entendre la voix utilisée
; SARAH devrait être assez intelligente pour utiliser la voix sélectionnée dans Windows
; mais si, pour certaines raisons, vous avez besoin de définir une autre voix, vous pouvez le faire grâce à ce paramètre
; par exemple voice=ScanSoft Virginie_Dri40_16kHz
; voice=Voice Text to Speech

; Sortie du haut-parler (ID séparés par une virgule "," -- ou "all" pour utiliser tous les hauts-parleurs)
; C'est donc un ID qui doit être founi. L'ID du haut-parleur par défaut est 0
; si vous voulez utiliser un autre haut-parleur, ou plusieurs, faites le à l'aide de ce paramètre
speaker=0

; EchoCancellationSpeaker (default is 0)
echo=0

; Speaker volume (multiply current 200% 50% ...)
spVolTTS=100
spVolPlay=100
```

#### Petits ajustements

Des petits ajustements peuvent être fait sur le comportement de la synthèse vocale. Voir la [documentation de Microsoft](http://msdn.microsoft.com/en-us/library/System.Speech.Recognition.SpeechRecognitionEngine_properties.aspx) pour plus d'informations.

```
; Speech engines tweaks (in seconds) 
alternate=10
initialSilence=0
babble=0
endSilence=0
endSilenceAmbiguous=0
```

#### Debug Recognition

```
; Print trace logs. Output speech wav in /dump (must exists)    
; Un dossier `dump/` doit être créé à la racine de l'installation de SARAH
; *Toutes* les reconnaissances vocales seront enregistrées dans ce répertoire
;   en incluant le fichier audio (fichier WAV) ainsi que la confidence liée
debug=false

; Log file path (default "${basedir}/${shortdate}.log")
; logfile=${basedir}/${shortdate}.log

; Log2Console port
udpport=9999
```

#### Les paramètres spéciaux pour Kinect

```
; ce paramètre permet d'indiquer si on souhaite seulement la reconnaissance vocale (true)
; ou si l'on veut activer les autres fonctionnalités (détection du visage, des gestes, ...)
only=false

; Kinect global FPS (1 = 30fps; 2 = 15fps; 3 = 10fps; 5 = 6fps)
; Le paramètre `fps` permet de réduire le nombre d'image par seconde et donc de réduire l'usage du CPU
; disponible seulement si vous utilisez les fonctionnalités avancées du Kinect
fps=2

; Sensor elevation +/- 27
; permet de changer le degré d'inclinaison du Kinect
elevation=0
```

#### Détection de mouvement

La détection de mouvement se met en StandBy après un temps donné.
* Le mode StandBy se base sur les données _Depth_
* Quand il est activé les autres tâches sont suspendues

```
; reconnaissance de mouvement (200ms par défaut)
motion=200

; % du seuil de détection de mouvement (7% par défaut)
motionTH=7

; délai après lequel le stand-by se met en place (5*60*1000 = 300000 = 2 minutes par défaut)
standby=300000
```
#### Gestion des couleurs

Calcule la couleur la plus proéminente parmi un ensemble de couleurs. Il envoie la couleur trouvée vers le serveur toutes les N millisecondes. Cela peut par exemple servir avec le plugin HUE.

```
; détecter la plus proéminente
color=45
    
; delai en milliseconde entre 2 couleurs proéminentes
colorTH=0
```

#### Reconnaissance d'un QRCode

Cherche un QRCode dans une image toutes les N millisecondes.
* Le suivi du corps empêche la détection du QRCode (par exemple quand l'utilisateur est trop loin de la caméra)
* Ne fonctionne pas avec les codes barres à cause de la mauvaise résolution de la caméra

```
; reconnaissance du code barre (200ms par défaut)
; délai entre chaque détection de QRCode
qrcode=200

; délai en millisecondes avant le prochain QRCode (2000ms par défaut)
qrcodeTH=2000
```

#### Reconnaissance des gestes

Tous les gestes doivent être décrits dans le fichier `plugins/*.gesture` pour déclencher leur détection. La détection échoue si le corps de l'utilisateur n'est pas correctement détecté.  
* Suit la taille de l'utilisateur
* Suit la position de la tête

```
; recognize gesture (default is 45ms)
gesture=45

; time in millisec before next gestures (default is 1000ms)
gestureTH=1000

; distance between head and foot must be more than this size in cm to avoid bug (defaut 80cm)
gestureFix=80

; Use seated gesture
seated=false

; Start gesture in StandBy mode (waiting for voice command)
gestureSB=false
```

Les différents gestes doivent être inscrits dans un fichier XML appelé `{plugin}.gesture`. La reconnaissance gestuelle est faite en vérifiant les jointures dans un modèle en 3D.

```xml
<gesture description="Hands Up" maxExecutionTime="1500" url="http://127.0.0.1:8080/sarah/gesture?g=5">
  <component firstJoint="WristLeft"      beginningRelationship="BelowAndLeft"  
             secondJoint="ShoulderLeft"  endingRelationship="AboveAndLeft" />
  <component firstJoint="WristRight"     beginningRelationship="BelowAndRight" 
             secondJoint="ShoulderRight" endingRelationship="AboveAndRight" />
</gesture>
```

Limitations :  
* Ne pas croiser deux gestes
* Trop de composants (_component) compliqués genre la détection difficile
* Utiliser le plugin gestion pour enclencher des règles si possible

![gesture schema](https://dl.dropboxusercontent.com/u/255810/Encausse.net/Sarah/github/skeleton.png)

See also: [SARAH: Reconnaissance gestuelle](http://encausse.wordpress.com/2012/10/08/s-a-r-a-h-allier-le-geste-a-la-parole/) 

#### Suivi du visage

[Track 87 head point](http://msdn.microsoft.com/en-us/library/jj130970.aspx#ID4EJNAC1) est utilisé, ainsi que l'animation du visage afin de trouver l'humeur de l'utilisateur.

```
; detect faces position (default is 45ms)
facedetec=45

; recognize faces (default is 200ms)
facereco=200

; track faces 3D Shapes (default is 45ms)
facetrack=45

; timeout in millisec for a given face (5*60*1000)
faceTH=300000

; Start face in StandBy mode (waiting for voice command)
faceSB=false
```

## Démarrer

Et finalement, voici comment démarrer SARAH :

1. **Démarrer le serveur** : double-cliquer sur le fichier appelé `Server_NodeJS.cmd`         
  ➔ une fenêtre MS-DOS s'ouvre affichant plusieurs lignes    
  ➔ vous pouvez ouvrir le site web [http://127.0.0.1:8080](http://127.0.0.1:8080) dans votre navigateur pour voir l'interface de SARAH

2. **Démarrer le client** - plusieurs options:       
  + Microphone (si vous n'avez pas de Kinect) : double-cliquer sur le fichier `Client_Microphone.cmd`;
  + Kinect (pour n'utiliser que l'audio) : double-cliquer sur le fichier `Client_Kinect_Audio.cmd`;
  + Kinect (toutes les fonctionnalités comme l'audio, la vidéo, reconnaissance des gestes, etc): double-cliquer sur le fichier `Client_Kinect`.    
  ➔ Une fois que le client est lancé une icône en forme de maison apparait alors près de l'horloge de Windows.

Ça y est ! Vous pouvez maintenant utiliser SARAH et la tester en disant __"SARAH quelle heure est-il ?"__.
Et pour vous éclatez encore plus vous pouvez installer un plugin (voir ci-dessous).

Si vous avez des problèmes, merci de se référer à la [FAQ](faq).

## Plugins

SARAH fonctionne surtout grâce aux plugins.

### Installation

#### AppStore

La meilleure façon d'installer un plugin est de passer par le _store_ :  

1. Ouvrir l'interface Web de SARAH ([http://127.0.0.1:8080](http://127.0.0.1:8080))  
2. Cliquer sur 'Store' (dans le menu de gauche)  
3. Choisir les plugins voulus et cliquer sur 'installer' (si l'opération échoue, retenter plusieurs fois)  
4. Redémarrer SARAH  

#### Manuellement

Il est également possible d'installer manuellement un plugin. Pour ce faire il faut dézipper l'archive du plugin dans le répertoire `plugins`.

La structure des fichiers sera alors:  
* plugins/demo/demo.js
* plugins/demo/demo.prop
* plugins/demo/demo.xml

### Configuration Plugins

Les plugins installés s'affichent dans l'interface Web ([http://127.0.0.1:8080](http://127.0.0.1:8080)) sous forme de _widgets_.

![Portlet](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/plugin_configuration_1.jpg)

1. Configuration
2. Documentation
3. Editeur de fichiers

Certains plugins ont un _widget_ personnalisé. Il faudra alors cliquer sur le bord droit pour pouvoir retourner le _widget_ et voir apparaitre les trois boutons (cela ne fonctionne que sous Chrome).

### Utilisation

Si vous ne savez pas comment utiliser le plugin, alors vous pouvez :
* Lire la documentation liée au plugin.
* Et s'il n'y a pas de documentation fournie, vous pouvez ouvrir le fichier XML pour trouver les commandes vocales disponibles.

## Mise à jour de SARAH

Si vous voulez mettre à jour SARAH (mais seulement pour une version < 4), vous devrez suivre les étapes ci-dessous :

1. Sauvegarder (en renommant le répertoire) votre installation courante
2. Télécharger et dézipper la nouvelle version
3. Copier les fichiers/dossiers ci-dessous de votre ancienne installation vers la nouvelle :
  + `custom.prop`: la configuration du serveur
  + `custom.ini`: la configuration du client (être sûr que rien de nouveau n'a été ajouté dans ce `custom.ini`)
  + `plugins/*`: vos plugins
  + `profile\profile.json`: informations des profils enregistrés
  + `profile\faces`: informations des visages enregistrés
