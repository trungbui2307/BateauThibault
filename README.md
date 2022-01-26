# Projet BateauThibault

## Table de matière
* [Informations générales](#Informations-générales)
* [Technologie](#Téchnology)
* [Installer](#Installer) [Fonctionnalités](#Fonctionnalités) 
* [Questions? Problèmes? Suggestions?](#Questions-Problèmes-Suggestions)

## Informations générales
C’est un projet désire un site simple gérer les produits.

## Technologies

#### Framework:
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
* [Docker](https://www.docker.com/)
* [docker-compose](https://docs.docker.com/compose/)

## Développement

#### Docker
- Si vous avez Docker : 

```
$ docker-compose build --no-cache && docker-compose up
```
ou

```
$ docker-compose up -d
```

- Si vous n'avez pas Docker : 
#### Frontend
Pour exécuter ce projet Angular, installez-le localement à l'aide de npm :
```
$ cd client
$ npm install -g @angular/cli
$ npm install
$ npm start
```

#### Backend

```
$ cd server
$ pip3 install -r requirements
$ python3 run/manage.py runserver
```

#### Ou trouver des applications

* [Le frontend va démarrer au port 4200](http://localhost:4200)
* [Le backend va démarrer au port 8000](http://localhost:8000)
* La base de données va démarrer au port 5432 et son interface graphique pgadmin va démarrer au port [5050](http://localhost:5050)

## Fonctionnalités
* Ecran Détail d’un produit
* Modification du stock, pourcentage de promotion
* Administration avec JWT OAuth2
* Calcul de chiffre d’affaire
* ... and more!

## Questions? Problèmes? Suggestions?
* Rapporter un bug ou request fonctionnalité, veuillez vous assurer que quelqu'un d'autre n'a pas créé de problème pour le même sujet.
* Besoin d'aide pour utiliser Bateau Thibault ? Contactez Slack.
