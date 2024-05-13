const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class MallChain extends Model {}

MallChain.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'MallChain',
    tableName: 'MallChain',
    timestamps: false
});

module.exports = MallChain;
