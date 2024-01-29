const { Router } = require('express');
const router = Router();
const listController = require('./controllers/listController.js');
const { catchErrors } = require('./middlewares/errorHandlers.js');
const tagController = require('./controllers/tagController.js');
const cardController = require('./controllers/cardController.js');

router.get('/', (req, res) => {
    res.redirect('/lists');
});

/** LISTS */
router.get('/lists', catchErrors(listController.index));
router.get('/lists/:id', catchErrors(listController.show));
router.post('/lists', catchErrors(listController.store));
// * patch pour faire une mise à jour
router.patch('/lists/:id', catchErrors(listController.update));
router.delete('/lists/:id', catchErrors(listController.destroy));

/** CARDS */
router.get('/lists/:id/cards', catchErrors(cardController.getCardsInList));
router.get('/cards/:id', catchErrors(cardController.getOneCard));
router.post('/cards', catchErrors(cardController.createCard));
router.patch('/cards/:id', catchErrors(cardController.modifyCard));
router.put('/cards/:id?', catchErrors(cardController.createOrModify));
router.delete('/cards/:id', catchErrors(cardController.deleteCard));

/* Tags */
router.get('/tags', catchErrors(tagController.getAllTags));
router.post('/tags', catchErrors(tagController.createTag));
router.patch('/tags/:id', catchErrors(tagController.modifyTag));
router.put('/tags/:id?', catchErrors(tagController.createOrModify));
router.delete('/tags/:id', catchErrors(tagController.deleteTag));
// POST /cards/:id/tag : associe un tag à la carte ciblée.
// L'id du tag doit se trouver dans les paramètres POST (sous le nom "tag_id")
router.post('/cards/:id/tags', catchErrors(tagController.associateTagToCard));
//DELETE /cards/:card_id/tag/:tag_id : supprime l'association entre le tag et la carte.
router.delete(
    '/cards/:card_id/tag/:tag_id',
    catchErrors(tagController.removeTagFromCard)
);

module.exports = router;

// * API RESTful
// * Pour chaque action d'un CRUD : il y a un verbe http :

/*
Verbes http liés au REST

GET : demander des informations
POST : créer des infos
PATCH : mettre à jour des infos
PUT : on créé une info si elle n'existe pas, sinon on la met à jour
DELETE : on efface une info
*/

/**
 * * Un contrôleur RESTful est un contrôleur qui va gérer le CRUD d'une ressource et qui contient 7 méthodes
 *
 * index : retourne un liste de ressources (GET)
 * show: retourne le détail d'une ressource (GET)
 * create: affiche un formulaire qui permet de créer une ressource (GET)
 * store : permet de persister une ressource (enregistrement en BDD) (POST)
 * edit: affiche un formulaire qui permet d'éditer une ressource existante (GET)
 * update: persiste la mise à jour en BDD (PUT / PATCH)
 * destroy: efface une ressource (DELETE)
 */
