# FAQ / Résoudre un problème

SARAH v4 est une version en cours de développement. Réécriture complète du client et du serveur pour plus de modularité.

- Merci d'aller sur la [FAQ générale](faq) pour les questions qui ne sont pas liée à une version de SARAH.
- Merci d'aller sur la page dédiée à [SARAH v3](faq_v3) si vous utilisez SARAH v3.


## Sommaire

## Quesions Avancées

Les AddOns proposent des propriétés avancées qu'il est possible de surcharger en les copiant dans `custom.ini`.

### Comment Tweaker la synhèse vocale ? 

Les moteurs de synhèse vocale sont affichés dans les logs:

```
[VoiceManager] Name: Microsoft Hortense Desktop Culture: fr-FR
[VoiceManager] Name: ScanSoft Virginie_Full_22kHz Culture: fr-FR
[VoiceManager] Name: Microsoft Zira Desktop Culture: en-US
[VoiceManager] Name: ScanSoft Sebastien_Full_22kHz Culture: fr-FR
```

Il est possible de forcer le moteur via la propriété `voice`

```
[voice]
voice=ScanSoft Virginie_Full_22kHz
```

### Comment Tweaker la reconnaissance vocale ? 

Il est possible de modifier la manière dont les phrases sont reconnues. Ces proprités sont décrites sur [le site de Microsoft](https://msdn.microsoft.com/en-us/library/System.Speech.Recognition.SpeechRecognitionEngine_properties.aspx) 

```
[speech.engine]

MaxAlternates=5
InitialSilenceTimeout=0
BabbleTimeout=0
EndSilenceTimeout=0.150
EndSilenceTimeoutAmbiguous=0.500
```

Les moteurs de reconnaissance vocale sont affichés dans les logs:

```
[SpeechManager]  Id: SR_MS_en-US_Kinect_11.0 Name: Microsoft Server Speech Recognition Language - Kinect (en-US) Culture: en-US Kinect: True
[SpeechManager]  Id: SR_MS_fr-FR_Kinect_11.0 Name: Microsoft Server Speech Recognition Language - Kinect (fr-FR) Culture: fr-FR Kinect: True
[SpeechManager]  Id: SR_MS_fr-FR_TELE_11.0 Name: Microsoft Server Speech Recognition Language - TELE (fr-FR) Culture: fr-FR Kinect: False
[SpeechManager]  Id: SR_MS_ZXX_Lightweight_v11.0 Name: Microsoft Lightweight Speech Recognizer v11.0 Culture:  Kinect: False
```

Il est possible de forcer le moteur pour toutes les sources audio via la propriété `RecognizerId`

```
[speech.engine]
RecognizerId=SR_MS_fr-FR_Kinect_11.0
```

### Comment Tweaker la sortie audio ? 

Les speaker sont affichés dans les logs. Le 0 est celui par defaut

```
[Speaker] Device 0: Haut-parleurs (Realtek High Def, 2 channels
[Speaker] Device 1: Realtek Digital Output(Optical), 2 channels
[Speaker] Device 2: Realtek Digital Output (Realtek, 2 channels
[Speaker] Device 3: Haut-parleurs (Yeti Stereo Micr, 2 channels
```

Il est possible de forcer le speaker à utiliser via la propriété `device`

```
[speaker]
; The device index to play on (use -1 for default device)
device=-1
```

### Comment Tweaker les microphones ? 

Les microphones sont affichés dans les Logs.  Le 0 est celui par defaut

```
[Microphone] Device 0: Réseau de microphones (2- Xbox , 2 channels
[Microphone] Device 1: Microphone (ManyCam Virtual Mic, 2 channels
[Microphone] Device 2: Mixage stéréo (Realtek High Def, 2 channels
```

Il est possible de forcer le(s) speaker(s) à utiliser via la propriété `device`

```
[microphone]
; Define the audio device index (0 is the default device, see logs) can be a list of devices separated by spaces
device=0
```
