const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connexion');

class List extends Model {}

List.init(
    {
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        position: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        sequelize: sequelize,
        tableName: 'list',
    }
);

module.exports = List;
