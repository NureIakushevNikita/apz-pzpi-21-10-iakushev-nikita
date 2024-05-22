const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Discount extends Model {}

Discount.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    percent: {
        type: DataTypes.INTEGER,
    },
    is_used: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: 'Discount',
    tableName: 'Discount',
    timestamps: false
});

module.exports = Discount;
