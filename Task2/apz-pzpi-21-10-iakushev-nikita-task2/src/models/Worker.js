const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Worker extends Model {}

Worker.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
    lastname: {
        type: DataTypes.STRING,
    },
    registration_date: {
        type: DataTypes.DATE,
    },
    phone_number: {
        type: DataTypes.STRING,
    },
    photo: {
        type: DataTypes.STRING,
    },
    store_id: {
        type: DataTypes.INTEGER,
    },
    wage_per_hour_UAH: {
        type: DataTypes.FLOAT,
    },
    wage_per_hour_USD: {
        type: DataTypes.FLOAT,
    },
}, {
    sequelize,
    modelName: 'Worker',
    tableName: 'Worker',
    timestamps: false
});

module.exports = Worker;
