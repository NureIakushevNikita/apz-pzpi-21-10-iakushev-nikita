const Attendance = require('../models/Attendance');
const {Op} = require("sequelize");

exports.createAttendance = async (req, res) => {
    const { user_id, store_id, entry_time, exit_time } = req.body;

    try {
        const newAttendance = await Attendance.create({
            user_id,
            store_id,
            entry_time,
            exit_time
        });

        res.status(201).json(newAttendance);
    } catch (error) {
        console.error('Error creating attendance:', error);
        res.status(500).json({ message: 'Error creating attendance', error: error.message });
    }
};

exports.getAttendancesByDateAndStore = async (req, res) => {
    const { storeId, date } = req.params;

    try {
        const formattedDate = new Date(date);

        const attendances = await Attendance.findAll({
            where: {
                store_id: storeId,
                entry_time: {
                    [Op.gte]: formattedDate,
                    [Op.lt]: new Date(formattedDate.getTime() + 24 * 60 * 60 * 1000)
                }
            },
            order: [['entry_time', 'ASC']]
        });

        res.status(200).json(attendances);
    } catch (error) {
        console.error('Error getting attendances by date and store:', error);
        res.status(500).json({ message: 'Failed to get attendances by date and store', error: error.message });
    }
};

exports.getAttendancesByDateRangeAndStore = async (req, res) => {
    const { storeId, dateFrom, dateTo } = req.params;

    try {
        const formattedDateFrom = new Date(dateFrom);
        const formattedDateTo = new Date(dateTo);

        const attendances = await Attendance.findAll({
            where: {
                store_id: storeId,
                entry_time: {
                    [Op.gte]: formattedDateFrom,
                    [Op.lt]: formattedDateTo
                }
            },
            order: [['entry_time', 'ASC']]
        });

        res.status(200).json(attendances);
    } catch (error) {
        console.error('Error getting attendances by date range and store:', error);
        res.status(500).json({ message: 'Failed to get attendances by date range and store', error: error.message });
    }
};

exports.countVisitsInStoreByDate = async (req, res) => {
    const { storeId, date } = req.params;

    try {
        const count = await Attendance.count({
            where: {
                store_id: storeId,
                entry_time: {
                    [Op.between]: [`${date} 00:00:00`, `${date} 23:59:59`]
                }
            }
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting total visits in store by date:', error);
        res.status(500).json({ message: 'Error getting total visits in store by date', error: error.message });
    }
};

exports.countVisitsInStoreByRange = async (req, res) => {
    const { storeId, dateFrom, dateTo } = req.params;

    try {
        const count = await Attendance.count({
            where: {
                store_id: storeId,
                entry_time: {
                    [Op.between]: [`${dateFrom} 00:00:00`, `${dateTo} 23:59:59`]
                }
            }
        });

        res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting total visits in store by period:', error);
        res.status(500).json({ message: 'Error getting total visits in store by period', error: error.message });
    }
};

exports.analyzeAttendance = async (req, res) => {
    const { storeId } = req.params;

    try {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);

        const firstPeriodEndDate = new Date();
        const firstPeriodStartDate = new Date();
        firstPeriodStartDate.setDate(firstPeriodStartDate.getDate() - 6);
        firstPeriodEndDate.setDate(firstPeriodEndDate.getDate() - 4);

        const secondPeriodEndDate = new Date();
        const secondPeriodStartDate = new Date();
        secondPeriodStartDate.setDate(secondPeriodStartDate.getDate() - 3);
        secondPeriodEndDate.setDate(secondPeriodEndDate.getDate() - 1);

        const firstPeriodVisits = await Attendance.count({
            where: {
                store_id: storeId,
                entry_time: {
                    [Op.between]: [startDate, firstPeriodEndDate]
                }
            }
        });

        const secondPeriodVisits = await Attendance.count({
            where: {
                store_id: storeId,
                entry_time: {
                    [Op.between]: [secondPeriodStartDate, endDate]
                }
            }
        });

        let trend;
        if (firstPeriodVisits > 0) {
            const percentageChange = ((secondPeriodVisits - firstPeriodVisits) / firstPeriodVisits) * 100;
            if (percentageChange > 0) {
                trend = 'Збільшилось';
            } else if (percentageChange < 0) {
                trend = 'Зменшилось';
            } else {
                trend = 'Не змінилося';
            }
        } else {
            trend = 'Немає даних для аналізу';
        }

        let advice;
        if (trend === 'Збільшилось') {
            advice = 'Навантаження на магазин за останній час збільшилося. Рекомендовано мати 4 або 5 осіб персоналу на робочому місці в завантажені дні.';
        } else if (trend === 'Зменшилось') {
            advice = 'Навантаження на магазин за останній час зменшилося. Рекомендована мінімальна кількість консультантів в магазині - 3.';
        } else {
            advice = 'Поки що немає потреби в змінах, але варто продовжувати моніторити ситуацію.';
        }

        res.status(200).json({
            firstPeriodVisits,
            secondPeriodVisits,
            trend,
            advice
        });
    } catch (error) {
        console.error('Помилка аналізу відвідуваності:', error);
        res.status(500).json({ message: 'Помилка аналізу відвідуваності', error: error.message });
    }
};

