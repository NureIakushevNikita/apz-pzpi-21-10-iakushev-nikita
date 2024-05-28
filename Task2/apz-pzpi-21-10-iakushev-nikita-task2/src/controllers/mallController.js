const Mall = require('../models/Mall');

exports.addMall = async (req, res) => {
    const { mall_chain_id, city, address, phone_number } = req.body;

    try {
        const newMall = await Mall.create({
            mall_chain_id,
            city,
            address,
            phone_number
        });

        res.status(201).json(newMall);
    } catch (error) {
        console.error('Error adding mall:', error);
        res.status(500).json({ message: 'Failed to add mall', error: error.message });
    }
};

exports.updateMall = async (req, res) => {
    const { id } = req.params;
    const { mall_chain_id, city, address, phone_number } = req.body;

    try {
        const mall = await Mall.findByPk(id);

        if (!mall) {
            return res.status(404).json({ message: 'Mall not found' });
        }

        await mall.update({
            mall_chain_id,
            city,
            address,
            phone_number
        });

        res.status(200).json(mall);
    } catch (error) {
        console.error('Error updating mall:', error);
        res.status(500).json({ message: 'Failed to update mall', error: error.message });
    }
};

exports.deleteMall = async (req, res) => {
    const { id } = req.params;

    try {
        const mall = await Mall.findByPk(id);

        if (!mall) {
            return res.status(404).json({ message: 'Mall not found' });
        }

        await mall.destroy();

        res.status(200).json({ message: 'Mall deleted successfully' });
    } catch (error) {
        console.error('Error deleting mall:', error);
        res.status(500).json({ message: 'Failed to delete mall', error: error.message });
    }
};

exports.getMallById = async (req, res) => {
    const { id } = req.params;

    try {
        const mall = await Mall.findByPk(id);

        if (!mall) {
            return res.status(404).json({ message: 'Mall not found' });
        }

        res.status(200).json(mall);
    } catch (error) {
        console.error('Error fetching mall by id:', error);
        res.status(500).json({ message: 'Failed to fetch mall', error: error.message });
    }
};

exports.getAllMalls = async (req, res) => {
    try {
        const malls = await Mall.findAll();
        res.status(200).json(malls);
    } catch (error) {
        console.error('Error fetching malls:', error);
        res.status(500).json({ message: 'Error fetching malls', error: error.message });
    }
};

exports.getMallsByChainId = async (req, res) => {
    const { mallChainId } = req.params;

    try {
        const malls = await Mall.findAll({
            where: { mall_chain_id: mallChainId }
        });

        if (!malls || malls.length === 0) {
            return res.status(404).json({ message: 'Malls not found for the given mall chain id' });
        }

        res.status(200).json(malls);
    } catch (error) {
        console.error('Error fetching malls by chain id:', error);
        res.status(500).json({ message: 'Error fetching malls by chain id', error: error.message });
    }
};