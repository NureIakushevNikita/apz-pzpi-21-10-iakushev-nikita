const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

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
