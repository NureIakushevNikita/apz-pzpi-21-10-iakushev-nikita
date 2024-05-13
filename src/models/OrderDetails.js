const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class OrderDetails extends Model {}

OrderDetails.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
    },
    product_id: {
        type: DataTypes.INTEGER,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    discount_id: {
        type: DataTypes.INTEGER,
    },
}, {
    sequelize,
    modelName: 'OrderDetails',
    tableName: 'OrderDetails',
    timestamps: false
});

module.exports = OrderDetails;
