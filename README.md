# Projet Web-Audio - M2 ATIAM - Promotion 2019-2020
Création d'un synthétiseur audio contrôlable par le clavier et la souris

## Introduction
Ce projet présente un synthétiseur numérique réalisé avec javascript et la librairie Pizzicato.
Le synthétiseur développé constitue l'aboutissement d'une semaine de travail dans un groupe de trois étudiants ATIAM : Yujia Yang, Bruno Souchu et André de Hillerin.

## Fonctionnement
La page web "homepage.html" permet d'accéder à un synthétiseur numérique et à son contrôle, grâce à une souris équipée d'une molette ou d'une fonction de scroll et aux touches A, Z, E, R, T, Y, U, et I d'un clavier.

### Pitch
L'utilisateur a le choix entre huit notes de la gamme de La mineur 2 (La, Si, Do, Ré, Mi, Fa, Sol, La). Il peut les sélectionner en appuyant sur les touches de A à I d'un un clavier AZERTY. L'appui sur une de ces touches génère une onde triangulaire de volume 0.3.

### Filtre passe-bas
L'utilisateur peut choisir de moduler la note jouée en faisant intervenir un filtre passe-bas. Il modifie la fréquence de coupure du filtre en déplaçant le curseur de haut en bas sur l'interface we et en restant appuyé sur la touche choisie. La fréquence de coupure varie entre 20Hz et 20kHz.

### Tremolo
L'utilisateur peut également choisir de moduler le son en faisant intervenir un effet de tremolo, qui permet de faire vibrer la note à une fréquence variable, comprise entre 0 et 20Hz. Il peut le faire en déplaçant le curseur sur la largeur de l'écran. Au milieu, la fréquence de tremolo est nulle, et elle augmente lorsque le curseur se déplace dans l'un ou l'autre extrême de l'écran.

### Ajout de reverb
Ce synthétiseur permet aussi l'ajout d'une reverbération particulière, obtenue par convolution de l'onde générée avec la réponse impulsionnelle d'une pièce dédiée à des enregistrements "dub". Pour cette raison, la reverbération est une "dub reverb". Sa présence se fait sentir avec la manipulation de la fonction de scroll de la souris. Dans ce projet, on remarquera toutefois que cet effet, d'un point de vue perceptif, ne fait que s'apparenter à une variation de volume. Afin d'en sentir la nature complète, il est nécessaire d'effectuer plus de traitement sur les sons, comme par exemple l'ajout de délai.

### Délai
Un dub delay a également fait l'objet d'une implémentation dans ce projet mais a donné lieu à de nombreuses erreurs et de surcharge auditive. En effet, le son tend à saturer lorsque l'effet d'echo est trop souvent modifié. Comme sa manipulation devait se faire par la souris, l'effet était souvent modifié, et le son était souvent saturé. Afin de garantir un confort de jeu et d'écoute optimaux, cette sous-branche a été avortée.

## Contraintes et projections
Nous avons par la suite décidé de contrôler ce délai par l'intermédiaire de sliders, comme c'est le cas dans les exemples illustrés dans https://alemangui.github.io/pizzicato/#dub-delay. Toutefois, ce développement suscitait trop d'erreurs et nous avons décidé d'abandonner l'idée de l'effet de délai. Des traces de recherches sont présentes dans le fichier javascript project_script.js et dans index.html.
La gestion des différents moyens de contrôler un slider (via un EventListener ou via la propriété onChange de la balise html du slider) s'est révélée assez complexe et nous manquions de temps. <br />
Ce projet est modulaire et peut aisément se poursuivre avec l'ajout d'une multitude d'autres effets de la librairie Pizzicato ! Nous pensons actuellement à implémenter des sons d'arrière-plan avec un clic de la souris, des effets de flanger ou de chorus avec le double-clic, et de tenter de résoudre le problème des sliders.<br />
Enfin, nous aimerions pouvoir jouer des sons de manière simultanée afin de produire des accords : cela peut s'obtenir en changeant la fonction d'appui d'une touche, qui contient aujourd'hui l'attribut "keydown" et n'autorise qu'une seule touche à la fois.

Nous vous souhaitons une belle expérience musicale ! 
Bruno, Yujia et André.
