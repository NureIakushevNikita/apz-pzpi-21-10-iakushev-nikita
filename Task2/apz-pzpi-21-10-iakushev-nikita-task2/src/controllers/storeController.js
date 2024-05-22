const Store = require('../models/Store');
const moment = require('moment');

exports.createStore = async (req, res) => {
    const { name, type, mall_id, floor, time_open, time_close } = req.body;

    try {
        const newStore = await Store.create({
            name,
            type,
            mall_id,
            floor,
            time_open,
            time_close,
        });

        res.status(201).json(newStore);
    } catch (error) {
        console.error('Error creating store:', error);
        res.status(500).json({ message: 'Error creating store', error: error.message });
    }
};

exports.updateStore = async (req, res) => {
    const { id } = req.params;
    const { name, type, mall_id, floor, time_open, time_close } = req.body;

    try {
        const store = await Store.findByPk(id);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        await store.update({
            name,
            type,
            mall_id,
            floor,
            time_open,
            time_close,
        });

        res.status(200).json(store);
    } catch (error) {
        console.error('Error updating store:', error);
        res.status(500).json({ message: 'Error updating store', error: error.message });
    }
};

exports.deleteStore = async (req, res) => {
    const { id } = req.params;

    try {
        const store = await Store.findByPk(id);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        await store.destroy();
        res.status(200).json({ message: 'Store deleted successfully' });
    } catch (error) {
        console.error('Error deleting store:', error);
        res.status(500).json({ message: 'Error deleting store', error: error.message });
    }
};

exports.getAllStores = async (req, res) => {
    try {
        const stores = await Store.findAll();
        res.status(200).json(stores);
    } catch (error) {
        console.error('Error fetching stores:', error);
        res.status(500).json({ message: 'Error fetching stores', error: error.message });
    }
};

exports.getStoreById = async (req, res) => {
    const { id } = req.params;

    try {
        const store = await Store.findByPk(id);

        if (!store) {
            return res.status(404).json({ message: 'Store not found' });
        }

        res.status(200).json(store);
    } catch (error) {
        console.error('Error fetching store:', error);
        res.status(500).json({ message: 'Error fetching store', error: error.message });
    }
};

exports.getStoresByMallId = async (req, res) => {
    const { mallId } = req.params;

    try {
        const stores = await Store.findAll({
            where: {
                mall_id: mallId
            }
        });

        res.status(200).json(stores);
    } catch (error) {
        console.error('Error fetching stores by mall id:', error);
        res.status(500).json({ message: 'Error fetching stores by mall id', error: error.message });
    }
};

