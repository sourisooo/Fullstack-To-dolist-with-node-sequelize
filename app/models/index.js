const List = require('./list');
const Card = require('./card');
const Tag = require('./tag');
const CardHasTag = require('./card_has_tag');
// List & Card : One To Many
List.hasMany(Card, {
    as: 'cards',
    foreignKey: 'list_id',
});

Card.belongsTo(List, {
    as: 'list',
    foreignKey: 'list_id',
});

// Card & Tag : Many To Many
Card.belongsToMany(Tag, {
    as: 'tags',
    through: 'card_has_tag',
    foreignKey: 'card_id',
    otherKey: 'tag_id',
    timestamps: false,
});

Tag.belongsToMany(Card, {
    as: 'cards',
    through: 'card_has_tag',
    foreignKey: 'tag_id',
    otherKey: 'card_id',
    timestamps: false,
});

module.exports = { List, Card, Tag, CardHasTag };
