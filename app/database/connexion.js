const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgresql://postgres:random@localhost/Todolist', {
    define: {
        underscored: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

module.exports = sequelize;
