const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');

exports.createAdmin = async (req, res) => {
    const { email, password, name, lastname, phone_number, mall_id } = req.body;

    try {
        const existingAdmin = await Admin.findOne({
            where: {
                email: email
            }
        });

        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            email,
            password: hashedPassword,
            name,
            lastname,
            phone_number,
            mall_id
        });

        res.status(201).json(newAdmin);
    } catch (error) {
        console.error('Error creating admin:', error);
        res.status(500).json({ message: 'Error creating admin', error: error.message });
    }
};

exports.getMallIdByAdminId = async (req, res) => {
    const { adminId } = req.params;

    try {
        const admin = await Admin.findByPk(adminId, {
            attributes: ['mall_id']
        });

        if (!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        res.status(200).json({ mall_id: admin.mall_id });
    } catch (error) {
        console.error('Error fetching mall_id:', error);
        res.status(500).json({ message: 'Failed to fetch mall_id', error: error.message });
    }
};