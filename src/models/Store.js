const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Store extends Model {}

Store.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    mall_id: {
        type: DataTypes.INTEGER,
    },
    floor: {
        type: DataTypes.INTEGER,
    },
    time_open: {
        type: DataTypes.TIME,
    },
    time_close: {
        type: DataTypes.TIME,
    },
}, {
    sequelize,
    modelName: 'Store',
    tableName: 'Store',
    timestamps: false
});

module.exports = Store;
