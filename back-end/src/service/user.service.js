require('dotenv').config();
const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = db.Users;
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const newUserId = uuidv4();

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            user_id: newUserId,
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
            dob: req.body.dob,
            gender: req.body.gender,
        };

        await Users.create(newUser);
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.authenticate = async (req, res) => {
    try {
        const user = await Users.findOne({
            where: { username: req.body.username },
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.user_id, username: user.username, role: user.role }, SECRET_KEY, {
            expiresIn: '10d',
        });

        res.status(200).json({
            message: 'Authentication successful',
            token,
            userData: {
                userId: user.user_id,
                name: user.name,
                username: user.username,
                gender: user.gender,
                dob: user.dob,
                role: user.role,
            },
        });
    } catch (error) {
        console.error('Error during authentication:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAll = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                username: { [Op.not]: req.body.currentUsername },
            },
            attributes: ['user_id', 'name', 'username', 'gender', 'dob', 'role'], // Chỉ lấy các field cần thiết
        });

        res.status(200).json(users);
    } catch (error) {
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.update = async (req, res) => {
    try {
        Users.update(
            {
                skin_type: req.body.skinType,
                skin_prob: req.body.skinProb,
            },
            {
                where: {
                    username: req.body.username,
                },
            },
        ).then((result) => {
            res.status(200).send('Cập nhật thành công');
        });
    } catch (err) {
        console.log(err);
        res.status(500).send('Error due to ', err);
    }
};
