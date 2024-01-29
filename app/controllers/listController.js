const sanitizeHtml = require('sanitize-html');
const Joi = require('joi');
const { List } = require('../models');

// * On fait la gestion d'erreur

const listController = {
    async index(req, res) {
        const lists = await List.findAll({
            include: { association: 'cards', include: 'tags' },
            order: [
                ['position', 'ASC'],
                ['cards', 'position', 'ASC'],
            ],
        });

        res.json(lists);
    },

    async show(req, res, next) {
        const listId = req.params.id;

        const list = await List.findByPk(listId, {
            include: { association: 'cards', include: 'tags' },
            order: [
                ['position', 'ASC'],
                ['cards', 'position', 'ASC'],
            ],
        });

        // * un middleware 404
        if (!list) {
            return next();
        }

        return res.json(list);
    },

    async store(req, res) {
        // ! On doit valider req.body et ne pas se servir de ses éléments directement
        const name = sanitizeHtml(req.body.name);

        const list = await List.create({ name: name, position: req.body.position });

        res.json({ message: 'Liste créée', list: list });
    },

    async update(req, res, next) {
        // * il faut sanitizer req.body
        const listId = req.params.id;
        const list = await List.findByPk(listId);

        // * validation des champs avec Joi
        const listSchema = Joi.object({
            name: Joi.string().min(2),
            position: Joi.number().integer().min(1),
        })
            .min(1)
            .message('Il nous manque des paramètres');

        // * toujours avec Joi, on appelle la méthode validate
        const { error } = listSchema.validate(req.body);
        if (error) {
            // ! ici le middleware d'erreur sera exécuté
            return next(error);
        }

        if (!list) {
            // * à ce niveau le middleware 404 sera le prochains
            return next();
        }

        const { name, position } = req.body;

        if (name) {
            list.name = name;
        }

        if (position) {
            list.position = position;
        }

        await list.save();

        return res.json(list);
    },

    async destroy(req, res) {
        const listId = req.params.id;

        const listDeleted = await List.destroy({ where: { id: listId } });
        // const list = await List.findByPk(listId);

        // await list.destroy();

        res.json({ message: 'objet détruit', listDeleted });
    },
};

module.exports = listController;
