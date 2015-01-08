# Premiers Pas

Cette page est seulement pour **SARAH v3**. Merci d'aller sur la page dédiée à [SARAH v4](installation_v4) si vous testez cette nouvelle version.

## Sommaire

* [Installation pour Windows](#windows)
* [Configuration](#configuration)
* [Démarrer](#démarrer)
* [Mise à jour](#mise-à-jour)

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

Maintenant voici ce qu'il faut faire :

1. Aller dans le répertoire `profile/` et effacer le fichier `profile.json` (sinon SARAH risque de vous appeler _Jean-Philippe_ de temps en temps !)
2. Récupérer une Google API Key ([voir ci-dessous](#récupérer-une-google-api-key))
3. Regarder les différents paramètres disponibles dans le fichier `config.ini`

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

Si vous avez des problèmes, merci de se référer à la [FAQ](faq).

## Mise à jour

Si vous voulez mettre à jour SARAH (mais seulement pour une version < 4), vous devrez suivre les étapes ci-dessous :

1. Sauvegarder (en renommant le répertoire) votre installation courante
2. Télécharger et dézipper la nouvelle version
3. Copier les fichiers/dossiers ci-dessous de votre ancienne installation vers la nouvelle :
  + `custom.prop`: la configuration du serveur
  + `custom.ini`: la configuration du client (être sûr que rien de nouveau n'a été ajouté dans ce `custom.ini`)
  + `plugins/*`: vos plugins
  + `profile\profile.json`: informations des profils enregistrés
  + `profile\faces`: informations des visages enregistrés
