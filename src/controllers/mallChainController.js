const MallChain = require('../models/MallChain');

exports.getAllMallChains = async (req, res) => {
    try {
        const mallChains = await MallChain.findAll();

        res.status(200).json(mallChains);
    } catch (error) {
        console.error('Error fetching mall chains:', error);
        res.status(500).json({ message: 'Failed to fetch mall chains', error: error.message });
    }
};

exports.addMallChain = async (req, res) => {
    const { name } = req.body;

    try {
        const newMallChain = await MallChain.create({
            name,
        });

        res.status(201).json(newMallChain);
    } catch (error) {
        console.error('Error adding MallChain:', error);
        res.status(500).json({ message: 'Failed to add MallChain', error: error.message });
    }
};

exports.updateMallChain = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const mallChain = await MallChain.findByPk(id);

        if (!mallChain) {
            return res.status(404).json({ message: 'MallChain not found' });
        }

        mallChain.name = name || mallChain.name;

        await mallChain.save();

        res.status(200).json(mallChain);
    } catch (error) {
        console.error('Error updating MallChain:', error);
        res.status(500).json({ message: 'Failed to update MallChain', error: error.message });
    }
};

exports.deleteMallChain = async (req, res) => {
    const { id } = req.params;

    try {
        const mallChain = await MallChain.findByPk(id);

        if (!mallChain) {
            return res.status(404).json({ message: 'MallChain not found' });
        }

        await mallChain.destroy();

        res.status(200).json({ message: 'MallChain deleted successfully' });
    } catch (error) {
        console.error('Error deleting MallChain:', error);
        res.status(500).json({ message: 'Failed to delete MallChain', error: error.message });
    }
};

exports.getMallChainById = async (req, res) => {
    const { id } = req.params;

    try {
        const mallChain = await MallChain.findByPk(id);

        if (!mallChain) {
            return res.status(404).json({ message: 'MallChain not found' });
        }

        res.status(200).json(mallChain);
    } catch (error) {
        console.error('Error fetching MallChain:', error);
        res.status(500).json({ message: 'Failed to fetch MallChain', error: error.message });
    }
};
