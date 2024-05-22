const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Mall extends Model {}

Mall.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    mall_chain_id: {
        type: DataTypes.INTEGER,
    },
    city: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Mall',
    tableName: 'Mall',
    timestamps: false
});

module.exports = Mall;
