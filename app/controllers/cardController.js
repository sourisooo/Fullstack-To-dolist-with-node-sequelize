const { Card } = require('../models');

const cardController = {
    async getCardsInList(req, res, next) {
        const listId = req.params.id;
        const cards = await Card.findAll({
            where: {
                list_id: listId,
            },
            include: 'tags',
            order: [['position', 'ASC']],
        });

        if (!cards) {
            return next();
        }

        return res.json(cards);
    },

    async getOneCard(req, res, next) {
        const cardId = req.params.id;
        const card = await Card.findByPk(cardId, {
            include: 'tags',
            order: [['position', 'ASC']],
        });
        if (!card) {
            return next();
        }
        return res.json(card);
    },

    async createCard(req, res) {
        const { content, color, list_id } = req.body;

        let bodyErrors = [];
        if (!content) {
            bodyErrors.push(`content can not be empty`);
        }
        if (!list_id) {
            bodyErrors.push(`list_id can not be empty`);
        }

        if (bodyErrors.length) {
            res.status(400).json(bodyErrors);
        } else {
            let newCard = Card.build({ content, list_id });
            if (color) {
                newCard.color = color;
            }
            await newCard.save();
            res.json(newCard);
        }
    },

    async modifyCard(req, res, next) {
        const cardId = req.params.id;
        const { content, color, list_id, position } = req.body;

        // on inclue les tags pour pouvoir les renvoyer à la fin de l'update
        let card = await Card.findByPk(cardId, {
            include: ['tags'],
        });
        if (!card) {
            return next();
        }
        // on ne change que les paramètres envoyés
        if (content) {
            card.content = content;
        }
        if (list_id) {
            card.list_id = list_id;
        }
        if (color) {
            card.color = color;
        }
        if (position) {
            card.position = position;
        }
        await card.save();

        return res.json(card);
    },

    async createOrModify(req, res) {
        let card;
        if (req.params.id) {
            card = await Card.findByPk(req.params.id);
        }
        if (card) {
            return await cardController.modifyCard(req, res);
        }

        return await cardController.createCard(req, res);
    },

    async deleteCard(req, res, next) {
        const cardId = req.params.id;
        // let card = await Card.findByPk(cardId);

        // if (!card) {
        //     return next();
        // }

        await Card.destroy({where: { id: cardId }});

         res.json('ok');
    },
};

module.exports = cardController;
