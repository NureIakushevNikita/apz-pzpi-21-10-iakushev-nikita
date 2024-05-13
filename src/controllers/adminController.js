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
