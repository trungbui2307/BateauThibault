# Projet BateauThibault

## Table de matière
* [Informations générales](#Informations-générales)
* [Technologie](#Téchnology)
* [Installer](#Installer)
* [Fonctionnalités](#Fonctionnalités) 
* [Questions? Problèmes? Suggestions?](#Questions-Problèmes-Suggestions)

## Informations générales
C’est un projet désire un site simple gérer les produits.

## Technologies

#### Framework:
[I'm an inline-style link](https://www.google.com)
    * [Django](https://www.djangoproject.com/)
    * [Angular](https://angular.io/)
    * [Angular Material](https://material.angular.io/)
    * Voir plus ici [Frontend Angular](https://github.com/cfa-2022/BateauThibault/tree/develop/FrontendAngular#readme)
   
#### Langages:
    * Python
    * Typescipt
   
#### Outils requis
    * [NodeJS version v14](https://nodejs.org/download/release/latest-v14.x/)
    * [Angular CLI v12.2.10](https://newreleases.io/project/github/angular/angular-cli/release/12.2.10)
    * [Python version v3.8.10](https://www.python.org/downloads/release/python-3810/)

## Développement
#### Frotnend
Pour exécuter ce projet Angular, installez-le localement à l'aide de npm :
```
$ npm install - g @angular/cli
$ cd FrontendAngular
$ ng serve
```

#### Backend
- Si vous avez Docker : 

```
$ cd Bateauthibault
$ docker-compose up -d
```


- Si vous n'avez pas Docker : 

```
$ cd Bateauthibault
$ pip3 install -r requirements
$ python3 run/manage.py runserver
```

## Fonctionnalités
* Ecran Détail d’un produit
* Modification du stock, pourcentage de promotion
* Administration avec JWT OAuth2
* Calcul de chiffre d’affaire
* ... and more!

## Questions? Problèmes? Suggestions?
* Rapporter un bug ou request fonctionnalité, veuillez vous assurer que quelqu'un d'autre n'a pas créé de problème pour le même sujet.
* Besoin d'aide pour utiliser Bateau Thibault ? Contactez Slack.
