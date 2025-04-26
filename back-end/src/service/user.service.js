require('dotenv').config();
const db = require('../model');
const { Op, where } = require('sequelize');
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
            userData: user,
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
        // Kiểm tra dữ liệu đầu vào
        if (!req.body.username || !req.body.skinType || !req.body.skinProb) {
            return res.status(400).send('Thiếu thông tin bắt buộc');
        }

        // Chuẩn bị dữ liệu cập nhật
        const updateData = {
            skin_type: req.body.skinType,
            acne: req.body.skinProb.acne || false,
            aging: req.body.skinProb.aging || false,
            dried: req.body.skinProb.dried || false,
            oily: req.body.skinProb.oily || false,
            // Thêm các trường skin problem khác nếu cần
        };

        // Thực hiện cập nhật
        const [affectedRows] = await Users.update(updateData, {
            where: {
                username: req.body.username,
            },
        });

        if (affectedRows === 0) {
            return res.status(404).send('Không tìm thấy người dùng để cập nhật');
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật thành công',
            data: updateData,
        });
    } catch (err) {
        console.error('Lỗi khi cập nhật thông tin người dùng:', err);
        res.status(500).json({
            success: false,
            message: 'Lỗi server khi cập nhật thông tin',
            error: err.message,
        });
    }
};

exports.getUserById = async (req, res) => {
    try {
        Users.findOne({
            where: {
                user_id: req.body.userId,
            },
        })
            .then((result) => {
                res.status(200).send(result);
            })
            .catch((err) => {
                res.status(500).send(err);
            });
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.updateInfo = async (req, res) => {
    try {
        console.log(req.body);
        const updateUser = await Users.findOne({
            where: {
                user_id: req.body.user_id,
            },
        });
        await updateUser.update({ name: req.body.name, bio: req.body.bio, avt_path: req.body.avt_path });
        res.status(200).json({
            success: true,
            message: 'User updated successfully',
        });
    } catch (err) {
        res.status(500).send(err);
    }
};
