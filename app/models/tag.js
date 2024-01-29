const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connexion');

class Tag extends Model {}


Tag.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        color: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: '#ccc'
        },
    },
    {
        sequelize: sequelize,
        tableName: 'tag'
    });


module.exports = Tag;