const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const ExcelJS = require('exceljs');

exports.getUserFromToken = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decodedToken = jwt.verify(token, 'secretKey');

        const user = await User.findByPk(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            registration_date: user.registration_date,
            phone_number: user.phone_number,
        });
    } catch (error) {
        console.error('Error decoding token:', error);
        res.status(500).json({ message: 'Token decoding failed', error: error.message });
    }
};

exports.updateProfile = async (req, res) => {
    const { name, lastname, phone_number } = req.body;

    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decodedToken = jwt.verify(token, 'secretKey');

        let user = await User.findByPk(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.lastname = lastname || user.lastname;
        user.phone_number = phone_number || user.phone_number;

        await user.save();

        res.status(200).json({
            id: user.id,
            email: user.email,
            name: user.name,
            lastname: user.lastname,
            registration_date: user.registration_date,
            phone_number: user.phone_number,
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Profile update failed', error: error.message });
    }
};

exports.changePassword = async (req, res) => {
    const { password } = req.body;

    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token not provided' });
        }

        const decodedToken = jwt.verify(token, 'secretKey');

        let user = await User.findByPk(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.password = await bcrypt.hash(password, 10);

        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Password change failed', error: error.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: { exclude: ['password'] }
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ message: 'Failed to get all users', error: error.message });
    }
};

exports.exportAllUsersToExcel = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'lastname', 'registration_date', 'phone_number']
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Users');

        worksheet.columns = [
            { header: 'ID', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 30 },
            { header: 'Lastname', key: 'lastname', width: 30 },
            { header: 'Registration Date', key: 'registration_date', width: 20 },
            { header: 'Phone Number', key: 'phone_number', width: 20 },
        ];

        users.forEach(user => {
            worksheet.addRow({
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                registration_date: new Date(user.registration_date).toLocaleDateString(),
                phone_number: user.phone_number
            });
        });

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=users.xlsx');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Error exporting users to Excel:', error);
        res.status(500).json({ message: 'Failed to export users to Excel', error: error.message });
    }
};

exports.getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id, {
            attributes: ['id', 'name', 'lastname', 'phone_number']
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user by id:', error);
        res.status(500).json({ message: 'Failed to fetch user', error: error.message });
    }
};
