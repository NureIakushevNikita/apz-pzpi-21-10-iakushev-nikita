const sequelize = require('../utils/db');
const { DataTypes, Model } = require('sequelize');


class User extends Model {}

User.init({
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
        defaultValue: DataTypes.NOW,
    },
    phone_number: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'User',
    tableName: 'User',
    timestamps: false
});

module.exports = User;
