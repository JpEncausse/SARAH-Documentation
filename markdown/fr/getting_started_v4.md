# Premiers Pas

SARAH v4 est une version en cours de développement. Réécriture complète du client et du serveur pour plus de modularité.

Merci d'aller sur la page dédiée à [SARAH v3](getting_started_v3) si vous utilisez SARAH v3.

## Sommaire

## Installation

Il y a quelques explication dans le dossier README de SARAH.

### Windows

Sur un windows "normal" certaines étapes sont dejà faites par defaut. Ci-dessous les différentes étapes :

1. Télécharger et dézipper [SARAH](http://sarah.encausse.net)   
  ➔ Lorsque vous dézippez le package de SARAH il faut vous assurer de **ne pas avoir d'espaces dans le nom du chemin d'accès**. Par exemple SARAH pourra se trouver dans `C:\SARAH\` mais pas dans `C:\Chemin avec des espaces\SARAH\`

2. (par defaut) Télécharger et installer [.Net 4.5 Framework](http://www.microsoft.com/fr-fr/download/details.aspx?id=30653)

3. (par defaut) Télécharger et installer la version x86 [Microsoft Speech Platform 11](http://www.microsoft.com/en-us/download/details.aspx?id=27225)   
   ➔ Ainsi que la langue du moteur [Microsoft Speech Platform - Languages 11](http://www.microsoft.com/en-us/download/details.aspx?id=27224)
 
Après toutes ces étapes SARAH est prête [à être configurée](#configuration). **Si vous avez un Kinect** merci de [suivre les instructions ci-dessous](#kinect-v1) afin de pouvoir l'utiliser.

4. Certaines personnes ont parfois une erreur: "Missing MSVCR110.dll" il faut alors installer [VisualStudio Update 4](http://www.microsoft.com/fr-fr/download/details.aspx?id=30679) (Je ne sais pas pourquoi ...)

### Kinect v1

1. Télécharger et installer [Microsoft Kinect SDK 1.8](http://www.microsoft.com/en-us/download/details.aspx?id=40278)   
   ➔ Ainsi que la langue du moteur [Kinect for Windows Language pack v11](http://www.microsoft.com/en-us/download/details.aspx?id=34809)

2. (optionnel) Installer le [Kinect Developper Toolkit 1.8](http://www.microsoft.com/en-sg/download/details.aspx?id=40276) pour jouer avec les exemples

3. Dans `client/custom.ini`

```
[kinect_v1]
enable=true

[microphone]
enable=false
```

Sinon le Kinect est considéré comme un Microphone. Actuellement vous ne pouvez pas utiliser simultanément Kinect 1 et Kinect 2.

### Kinect v2

1. Télécharger et installer [Microsoft Kinect SDK 2.0](http://www.microsoft.com/en-us/download/details.aspx?id=44561)   
   ➔ Ainsi que la langue du moteur [Kinect for Windows SDK 2.0 Language Packs](http://www.microsoft.com/en-us/download/details.aspx?id=43662)

2. (optionnel) Installer le [Kinect Developper Toolkit 1.8](http://www.microsoft.com/en-sg/download/details.aspx?id=40276) pour jouer avec les exemples

3. Dans `client/custom.ini`

```
[kinect_v2]
enable=true

[microphone]
enable=false
```

Sinon le Kinect est considéré comme un Microphone. Actuellement vous ne pouvez pas utiliser simultanément Kinect 1 et Kinect 2.

### Linux (server)

Le serveur de SARAH peut s'installer sur une machine Linux. Il faudra alors partager ou dupliquer le répertoire `plugin` les XML étant sur le client et les JS sur le serveur.
Il faudra aussi modifier la configuration du client et du serveur pur pointer leur adresses respectives.

```
git clone https://github.com/JpEncausse/SARAH-Server-NodeJS.git
cd SARAH-Server-NodeJS/server/app
sudo npm install
sudo ./start_server.sh
```

## Démarrer

Voici comment démarrer SARAH :

1. **Démarrer le serveur** : double-cliquer sur le fichier appelé `Start_Server.cmd`         
  ➔ une fenêtre MS-DOS s'ouvre affichant plusieurs lignes    
  ➔ vous pouvez ouvrir le site web [http://127.0.0.1:8080](http://127.0.0.1:8080) dans votre navigateur pour voir l'interface de SARAH

2. **Démarrer le client** :  double-cliquer sur le fichier appelé `Start_Client.cmd`           
  ➔ Une fois que le client est lancé une icône en forme de maison apparait alors près de l'horloge de Windows.

Ça y est ! Vous pouvez maintenant utiliser SARAH et la tester en disant __"SARAH quelle heure est-il ?"__.
Et pour vous éclatez encore plus vous pouvez installer un plugin (voir ci-dessous).

Si vous avez des problèmes, merci de se référer à la [FAQ](faq).


## Configuration

### Reconnaissance Vocale

Si vous souhaitez que SARAH fonctionne bien, il faut utiliser un bon micro. Dans [cet article](http://encausse.wordpress.com/2013/05/19/thevoice/) trois microphones (Microhpone, Kinect et VoiceTracker II) ont été testés avec SARAH.

- Mettre le microphone devant vous en hauteur avec les sources sonore parasite sur le côté ou dans le dos.
- Changer le volume d'entrée du son : aller dans ➔ `Panneau de Configuration` ➔  Chercher `Gérer les périphériques audio` ➔  `Clique droit sur votre microphone` ➔  Cliquer sur `Propriétés` ➔  `Change le niveau` (par exemple, pour un microphone classique, ce doit être ~90, et pour un Kinect, il faut tenter plusieurs configurations)
- Entrainer la reconnaissance vocale de Windows : aller dans ➔  `Panneau de Contrôle` ➔  `Reconnaissance vocale` ➔ `Suivre les dictatiels de reconnaissance vocale` (attention : avec un microphone classique il ne faut pas faire ce dictaciel plus d'une fois)

### Synthèse Vocale

SARAH utilise la voix féminine SAPI 32bit définie dans Windows 8. 

Il est possible [d'installer d'autres voix](http://encausse.wordpress.com/2013/05/23/sarah-joshua-jarvis-yuri-et-les-autres/)

  ➔ [la voix de Virginie](http://www.ac-limoges.fr/ia87/spip.php?article315) non officielle, fonctionne bien.    
  ➔ la société [Voxygen](http://voxygen.fr) propose de nombreuses voix (parlez leur de SARAH !)    
  ➔ En cas de problèmes, merci de consulter la [FAQ](faq)

Pour sélectionner une voix aller sur l'interface 32bit (pas 64bit): `%windir%\SysWOW64\speech\SpeechUX\sapi.cpl`


### Google API Key

SARAH sait reconnaitre des commandes. Mais **ne sait pas gérer les questions ouvertes**: "SARAH recherche * sur wikipedia". Dans ce cas SARAH interroge l'API de Google. La _Google API Key_ est nécessaire pour plusieurs plugins.

Merci de suivre attentivement les différentes étapes décrites ci-dessous (instructions provenant du site [http://www.chromium.org/developers/how-tos/api-keys](http://www.chromium.org/developers/how-tos/api-keys))

```block-tabs

#### 1) S'enregistrer Chromium

S'enregistrer sur le Google Group chromium :

* S'assurer d'être un membre de chromium-dev@chromium.org (vous pouvez souscrire à chromium-dev et choisir de ne pas recevoir d'emails). Pour cela, se rendre à l'adresse [https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev](https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-dev)
* Puis cliquer sur « _Join the group to send a message_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_1.png)

* Choisir « _Do not send updates by email_ »
* Cliquer sur « _Join the group_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_2.png)

#### 2) Créer App Console

Créer une console app sur Google

* Se rendre sur [https://cloud.google.com/console](https://cloud.google.com/console)
* Click on « _Create Project_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_3.png)

* Donner un nom
* Accepter the _Terms of Use_
* Cliquer sur le bouton « _Create_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_4.png)

#### 3) Activer Speech API

* Aller dans « _APIs & Auth > APIs_ » à partir du menu à gauche
* Dans **Browse API** chercher « _Speech API_ »
* Cliquer sur « _Speech API_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_5.png)

* Activer la clé

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_6.png)

* Accepter les _terms of use_

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_7.png)

#### 4) Créer une Speech Key

Créer sa clé « Speech API »

* Aller dans « _APIs & Auth > Credentials_ » à partir du menu à gauche
* Cliquer sur le bouton « _Create New Key_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_8.png)

* Cliquer sur le bouton « _Browser key_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_9.png)

* Cliquer sur le bouton « _Create_ »

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_10.png)

* Votre _API key_ :

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_11.png)

#### 5) Intégration dans SARAH

Intégration dans SARAH

* Ouvrir le fichier de configuration de SARAH (`client/custom.ini`) 
* Chercher la ligne `; Google Speech API Key (retrieve from Google Console)`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_12.png)

* Modifier la ligne `;key=` :
  + supprimer le point-virgule `;` au début de la ligne
  + ajouter la clé API juste après le égal `=`

![](https://raw.githubusercontent.com/JpEncausse/SARAH-Documentation/gh-pages/markdown/images/Installation_Google_Speech_API_13.png)

Remarque : cette clé est **pour votre usage exclusive et ne doit pas être utilisée par d'autres personnes**. 

```

