const { Tag, Card } = require('../models');

const tagController = {
    async getAllTags(req, res) {
        const tags = await Tag.findAll();
        res.json(tags);
    },

    async createTag(req, res) {
        const { name, color } = req.body;
        let bodyErrors = [];
        if (!name) {
            bodyErrors.push('name can not be empty');
        }
        if (!color) {
            bodyErrors.push('color can not be empty');
        }

        if (bodyErrors.length) {
            return res.status(400).json(bodyErrors);
        }

        let newTag = Tag.build({ name, color });
        await newTag.save();

        return res.json(newTag);
    },

    async modifyTag(req, res, next) {
        const tagId = req.params.id;
        const { name, color } = req.body;

        let tag = await Tag.findByPk(tagId);
        if (!tag) {
            return next();
        }
        if (name) {
            tag.name = name;
        }
        if (color) {
            tag.color = color;
        }

        await tag.save();

        res.json(tag);
    },

    async createOrModify(req, res) {
        let tag;
        if (req.params.id) {
            tag = await Tag.findByPk(req.params.id);
        }
        if (tag) {
            return await tagController.modifyTag(req, res);
        }

        return await tagController.createTag(req, res);
    },

    async deleteTag(req, res, next) {
        const tagId = req.params.id;
        let tag = await Tag.findByPk(tagId);

        if (!tag) {
            res.status(404).json('Can not find tag with id ' + tagId);
            return next();
        }

        await tag.destroy();

        return res.json('OK');
    },

    async associateTagToCard(req, res) {
        const cardId = req.params.id;
        const tagId = req.body.tag_id;

        let card = await Card.findByPk(cardId, {
            include: ['tags'],
        });
        if (!card) {
            return res.status(404).json('Can not find card with id ' + cardId);
        }

        let tag = await Tag.findByPk(tagId);
        if (!tag) {
            return res.status(404).json('Can not find tag with id ' + tagId);
        }

        // const newCardHasTag = await CardHasTag.create({
        //     card_id: req.params.id,
        //     tag_id: req.body.tag_id,
        // });

        // on laisse faire la magie de Sequelize ! méta-programmation méthode magique
        await card.addTag(tag);
        // malheureusement, les associations de l'instance ne sont pas mises à jour
        // on doit donc refaire un select
        card = await Card.findByPk(cardId, {
            include: ['tags'],
        });
        res.json(card);
    },

    async removeTagFromCard(req, res) {
        const { card_id, tag_id } = req.params;

        let card = await Card.findByPk(card_id);
        if (!card) {
            return res.status(404).json('Can not find card with id ' + card_id);
        }

        let tag = await Tag.findByPk(tag_id);
        if (!tag) {
            return res.status(404).json('Can not find tag with id ' + tag_id);
        }

        await card.removeTag(tag);

        card = await Card.findByPk(card_id, {
            include: ['tags'],
        });

        return res.json(card);
    },
};

module.exports = tagController;
