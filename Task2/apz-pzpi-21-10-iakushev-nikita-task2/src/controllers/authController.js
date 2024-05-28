const User = require("../models/User");
const Admin = require("../models/Admin")
const Worker = require("../models/Worker")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        res.status(200).json({
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
            lastname: newUser.lastname,
            registration_date: newUser.registration_date,
            phone_number: newUser.phone_number
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
};

exports.checkUserExists = async (req, res) => {
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(200).json({ message: 'User exists', exists: true });
        } else {
            return res.status(200).json({ message: 'User does not exist', exists: false });
        }
    } catch (error) {
        console.error('Error checking user:', error);
        res.status(500).json({ message: 'Error checking user', error: error.message });
    }
};

exports.loginUser = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        let user;

        switch (role) {
            case 'user':
                user = await User.findOne({
                    where: {
                        email: email
                    }
                });
                break;
            case 'admin':
                user = await Admin.findOne({
                    where: {
                        email: email
                    }
                });
                break;
            case 'worker':
                user = await Worker.findOne({
                    where: {
                        email: email
                    }
                });
                break;
            default:
                return res.status(400).json({ message: 'Invalid role' });
        }

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = jwt.sign(
            {
                userId: user.id,
            },
            'secretKey',
            { expiresIn: '24h' }
        );

        res.status(200).json({
            token: token,
            id: user.id,
            role: role
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
};
