const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'postgres',
    username: 'postgres',
    password: '12345',
    host: 'localhost',
    port: 5432,
    database: 'books',
});

module.exports = sequelize;