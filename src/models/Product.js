const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Product extends Model {}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    store_id: {
        type: DataTypes.INTEGER,
    },
    price_usd: {
        type: DataTypes.FLOAT,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    photo: {
        type: DataTypes.STRING,
    },
    description_ua: {
        type: DataTypes.STRING,
    },
    description_en: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Product',
    tableName: 'Product',
    timestamps: false
});

module.exports = Product;
