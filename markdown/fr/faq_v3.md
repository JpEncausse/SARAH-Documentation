# FAQ / Résoudre un problème

SARAH v3 est une version majoritairement installée depuis 1an en attendant la sortie de la v4 en version beta.

- Merci d'aller sur la [FAQ générale](faq) pour les questions qui ne sont pas liée à une version de SARAH.
- Merci d'aller sur la page dédiée à [SARAH v4](faq_v4) si vous testez cette nouvelle version.

## Sommaire


## Hardware

### Comment séparer SARAH serveur et client entre deux ordinateurs ?

_à compléter_

## Software

### Comment changer la langue ?

Pour utiliser SARAH dans une autre langue (ici c'est en anglais) il faudra : 

1. Editer le fichier `config.ini` et changer le paramètre de la langue en `language=en-US`  
2. Mettre à jour les plugins -- donc pour chaque plugins :
  + Traduire les commandes vocales qu'on trouve dans le fichier `{plugin}.xml` 
  + Définir l'attribut de tête en `xml:lang="en-US"` dans le fichier `{plugin}.xml` (donc ce fichier va commencer par `<grammar version="1.0" xml:lang="en-US"`)
  + Renommer le fichier `{plugin}.xml` en `{plugin}_en_US.xml`



## SARAH : Client

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


## SARAH : Serveur

### Le plugin ne s'installe pas !

C'est un bug dû à Github.

- Retenter plusieurs fois l'installation
- Essayer d'installer manuellement le plugin qui s'est téléchargé dans le répertoire `/temp/` de SARAH

### Le serveur retourne une erreur

Si un le message d'erreur `module not found` apparait dans la fenêtre du serveur c'est que le plugin ne fonctionne pas 
- soit un problème avec le fichier JavaScript `.js` 
- ou le fichier de configuration `.prop`. 

Essayer de contacter le développeur du plugin.

### Je n'arrive pas à le configurer

- Il y a un bug connu avec Internet Explorer, Firefox et d'autres... Dans ce cas, essayer avec Google Chrome.
- Certains _touch devices_, comme le LeapMotion, peuvent créer un conflit dans le portail vis à vis du _glisser-déposer_.


