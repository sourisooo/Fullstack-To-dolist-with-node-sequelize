// Charger les variables d'environnement 
require('dotenv').config();

// Import des librairies externes
const cors = require('cors');
const express = require('express');

// Import des modules internes
const router = require('./app/routers.js');
const {
    notFound,
    devErrors,
    prodErrors,
} = require('./app/middlewares/errorHandlers.js');

// Créer une app express
const app = express();

// * cors (Cross Origin Request)
// * Ce middleware sert à autoriser une application tierce à interroger l'API okanban, dans l'idéal on devrait le configurer pour n'accepter que des domaines triés sur le volet.
app.use(cors(process.env.CORS_DOMAINS || '*')); // * = tous les domaines

// Body parsers
app.use(express.json()); // Parser les body de type 'application/json' (ex : avec 'fetch')
app.use(express.urlencoded({ extended: false })); // Parser les body de type 'application/x-www-urlencoded' (eg, les '<form>' HTML)

// Branchement du router
app.use(router);

// ! Branchement des middlewares de gestion d'erreurs
app.use(notFound);

// Gestion de erreurs (bonus)
if (app.get('env') === 'development') {
    app.use(devErrors);
} else {
    app.use(prodErrors);
}

// Définir des variables valables dans toute l'app (facultatif)
app.set('port', process.env.PORT || 5000);
app.set('base_url', process.env.BASE_URL || 'http://localhost');

// Lancement du serveur
app.listen(app.get('port'), () => {
    console.log(`Listening on ${app.get('base_url')}:${app.get('port')}`);
});
