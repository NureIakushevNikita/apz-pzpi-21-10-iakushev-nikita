const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Order extends Model {}

Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    date: {
        type: DataTypes.DATE,
    },
    order_type: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    order_state: {
        type: DataTypes.STRING,
    },
}, {
    sequelize,
    modelName: 'Order',
    tableName: 'Order',
    timestamps: false
});

module.exports = Order;
