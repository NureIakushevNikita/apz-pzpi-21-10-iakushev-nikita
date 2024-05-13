const Worker = require('../models/Worker');
const Store = require('../models/Store')
const {hash} = require("bcrypt");
const {Op} = require("sequelize");

exports.createWorker = async (req, res) => {
    const { email, password, name, lastname, phone_number, photo, store_id, wage_per_hour, wage_currency } = req.body;

    try {
        let wage_per_hour_USD = null;
        let wage_per_hour_UAH = null;

        if (wage_currency === 'USD') {
            wage_per_hour_USD = wage_per_hour;
        } else if (wage_currency === 'UAH') {
            wage_per_hour_UAH = wage_per_hour;
        } else {
            return res.status(400).json({ message: 'Invalid currency' });
        }

        const newWorker = await Worker.create({
            email,
            password: await hash(password, 10),
            name,
            lastname,
            phone_number,
            photo,
            store_id,
            wage_per_hour_USD,
            wage_per_hour_UAH,
        });

        res.status(201).json(newWorker);
    } catch (error) {
        console.error('Error creating worker:', error);
        res.status(500).json({ message: 'Error creating worker', error: error.message });
    }
};

exports.getWorkersByStoreId = async (req, res) => {
    const { storeId } = req.params;

    try {
        const workers = await Worker.findAll({
            where: {
                store_id: storeId
            }
        });

        res.status(200).json(workers);
    } catch (error) {
        console.error('Error fetching workers by store id:', error);
        res.status(500).json({ message: 'Failed to fetch workers', error: error.message });
    }
};

exports.getWorkersByMallId = async (req, res) => {
    const { mallId } = req.params;

    try {
        const storesInMall = await Store.findAll({
            where: {
                mall_id: mallId
            },
            attributes: ['id']
        });

        const workers = await Worker.findAll({
            where: {
                store_id: {
                    [Op.in]: storesInMall.map(store => store.id)
                }
            }
        });

        res.status(200).json(workers);
    } catch (error) {
        console.error('Error fetching workers by mall id:', error);
        res.status(500).json({ message: 'Failed to fetch workers', error: error.message });
    }
};

exports.countWorkersByStoreId = async (req, res) => {
    const { storeId } = req.params;

    try {
        const count = await Worker.count({
            where: {
                store_id: storeId
            }
        });

        res.status(200).json({ storeId: storeId, workerCount: count });
    } catch (error) {
        console.error('Error counting workers in store:', error);
        res.status(500).json({ message: 'Failed to count workers', error: error.message });
    }
};
