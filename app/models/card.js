const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connexion');

class Card extends Model {}


Card.init(
    {
        content: {
            type: DataTypes.TEXT,
        },

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },

        color: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '#fff'
        },

        list_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize: sequelize,
        tableName: 'card'
    });


module.exports = Card;