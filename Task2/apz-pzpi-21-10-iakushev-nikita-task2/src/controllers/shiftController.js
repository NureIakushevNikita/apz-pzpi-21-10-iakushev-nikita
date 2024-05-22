const Shift = require('../models/Shift');
const Store = require('../models/Store')
const Worker = require('../models/Worker')
const { addDays, format } = require('date-fns');
const {Op} = require("sequelize");

exports.createShift = async (req, res) => {
    const { worker_id, schedule } = req.body;

    try {
        const shift = await Shift.create({ worker_id, schedule });

        res.status(201).json(shift);
    } catch (error) {
        console.error('Error creating shift:', error);
        res.status(500).json({ message: 'Error creating shift', error: error.message });
    }
};

exports.generateWorkerSchedule = async (req, res) => {
    const { workerId } = req.params;

    try {
        const lastShift = await Shift.findOne({
            where: { worker_id: workerId },
            order: [['id', 'DESC']]
        });

        if (!lastShift) {
            return res.status(400).json({ message: 'No shifts found for this worker' });
        }

        const schedule = lastShift.schedule;

        const worker = await Worker.findByPk(workerId);
        const storeId = worker.store_id;
        const store = await Store.findByPk(storeId);

        const { time_open, time_close } = store;

        let currentDate;

        const shifts = [];
        if (lastShift.start_time) {
            currentDate = addDays(lastShift.start_time, schedule + 1)
        }
        else {
            currentDate =addDays(new Date, 1);
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < schedule; j++) {
                shifts.push({
                    worker_id: workerId,
                    start_time: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), time_open.getHours(), time_open.getMinutes()),
                    end_time: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), time_close.getHours(), time_close.getMinutes()),
                    schedule: schedule
                });
                currentDate = addDays(currentDate, 1);
            }
                currentDate = addDays(currentDate, schedule);

        }

        console.log(shifts);

        await Shift.bulkCreate(shifts);

        res.status(200).json({ message: 'Worker schedule generated successfully' });
    } catch (error) {
        console.error('Error generating worker schedule:', error);
        res.status(500).json({ message: 'Error generating worker schedule', error: error.message });
    }
};

exports.getWorkersInStoreByDate = async (req, res) => {
    const { storeId, date } = req.params;

    try {
        const store = await Store.findByPk(storeId);
        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        const workers = await Worker.findAll({
            where: { store_id: storeId }
        });

        const workersOnDate = await Promise.all(workers.map(async (worker) => {
            const shifts = await Shift.findAll({
                where: {
                    worker_id: worker.id,
                    start_time: {
                        [Op.lte]: new Date(date + 'T23:59:59.999Z')
                    },
                    end_time: {
                        [Op.gte]: new Date(date + 'T00:00:00.000Z')
                    }
                }
            });
            return shifts.length > 0 ? worker : null;
        }));

        const filteredWorkers = workersOnDate.filter((worker) => worker !== null);

        res.status(200).json({ workers: filteredWorkers });
    } catch (error) {
        console.error('Error getting workers in store by date:', error);
        res.status(500).json({ message: 'Error getting workers in store by date', error: error.message });
    }
};

exports.getWorkerCountInStoreByDate = async (req, res) => {
    const { storeId, date } = req.params;

    try {
        const workers = await Worker.findAll({
            where: { store_id: storeId }
        });

        let workerCount = 0;
        for (const worker of workers) {
            const shifts = await Shift.findAll({
                where: {
                    worker_id: worker.id,
                    [Op.and]: [
                        { start_time: { [Op.lte]: new Date(date + 'T23:59:59.999Z') } },
                        { end_time: { [Op.gte]: new Date(date + 'T00:00:00.000Z') } }
                    ]
                }
            });
            if (shifts.length > 0) {
                workerCount++;
            }
        }

        res.status(200).json({ workerCount: workerCount });
    } catch (error) {
        console.error('Error getting worker count in store by date:', error);
        res.status(500).json({ message: 'Error getting worker count in store by date', error: error.message });
    }
};

