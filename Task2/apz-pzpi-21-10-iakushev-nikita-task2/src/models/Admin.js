const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Admin extends Model {}

Admin.init({
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
    mall_id: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: 'Admin',
    tableName: 'Admin',
    timestamps: false
});

module.exports = Admin;
