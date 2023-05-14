# Projet Dev

Le but de ce module est de proposer un projet à réaliser par 2 ou 3 libre mais soumis a certaine obligations, nous avons donc réalisé un site internet proposant un quizz en multijoueur. Le projet contient une base de donnée, utilise des sockets et gère des utilisateurs.


### Déploiement

L'application fonctionne uniquement en local pour le moment, il est nécessaire d'utiliser 2 navigateur différents afin de tester le site en raison des cookies.

## Installation

Cloner le Project
`https://github.com/LBROCHARD/Challenge_48h.git`

Ensuite installer le projet à l'aide de npm

Dans 2 terminaux différents depuis le dossier Challenge-48H

Front :

```
cd .\culture_quizz\
npm i
```

Back :

```
cd .\culture_quizz_Back\
npm i
```

## Démarrage

Pour démarrer le projet, il suffit d'uttiliser la commande suivante

Back dans le dossier \culture_quizz_Back\:

```
npm start
```
Serveur Mongo db dans \culture_quizz_Back\serverMongo\

```
node server
```

Front dans le dossier \culture_quizz\:

```
npm run start
```

puis accepter de changer le port d'utilisation du front.


## Fonctionnalité

Pour jouer, il est nécessaire de se créer un compte et de se connecter, vous pouvez ensuite créer un lobby qui genere une clé a envoyer à ses amis pour jouer ensemble ou alors directement rejoindre un ami avec la meme clé d'invitation. nimporte quel joueur peux ensuite lancer la partie, ensuite il faut répondre au questions, chaque tour le serveur attend la reponses de tout les joueurs pour allez à la question suivante. et enfin relancer une partie une fois celle-ci terminé. Il est également possible de créer ses propres question en clickant simplement sur la page question dans la head barre, celle-ci sont ensuite ajouter a la base de donnée pour tout le monde.
## Fabriqué avec

- [React](https://fr.reactjs.org/) - Framework JavaScript (front)
- [Node](https://nodejs.org/fr/) - Environnement d’exécution JavaScript
- [MongoDB](https://www.mongodb.com/fr-fr) - Base de donnée
- [Yarn](https://yarnpkg.com/) - Base de donnée


## Auteurs

- **Flavio Cormerais** _alias_ [@FlAvril](https://github.com/FCORMERAIS) B2
- **Marius Bourse** _alias_ [@Bourse Marius](https://github.com/loguio) B2
- **Jules Outin** _alias_ [@Jules Outin](https://github.com/JulesOutin) B2
