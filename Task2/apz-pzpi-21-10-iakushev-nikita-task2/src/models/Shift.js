const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Shift extends Model {}

Shift.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    worker_id: {
        type: DataTypes.INTEGER,
    },
    start_time: {
        type: DataTypes.DATE,
    },
    end_time: {
        type: DataTypes.DATE,
    },
    schedule: {
        type: DataTypes.INTEGER,
    }
}, {
    sequelize,
    modelName: 'Shift',
    tableName: 'Shift',
    timestamps: false
});

module.exports = Shift;
