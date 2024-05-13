const { DataTypes, Model } = require('sequelize');
const sequelize = require('../utils/db');

class Attendance extends Model {}

Attendance.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
    store_id: {
        type: DataTypes.INTEGER,
    },
    entry_time: {
        type: DataTypes.DATE,
    },
    exit_time: {
        type: DataTypes.DATE,
    }
}, {
    sequelize,
    modelName: 'Attendance',
    tableName: 'Attendance',
    timestamps: false
});

module.exports = Attendance;
