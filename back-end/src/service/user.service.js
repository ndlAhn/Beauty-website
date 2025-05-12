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

        const temp = {
            user_id: newUserId,

            name: req.body.name,
            username: req.body.username,
            dob: req.body.dob,
            gender: req.body.gender,
        };
        await Users.create(newUser);
        res.status(201).send(temp);
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

        const token = jwt.sign({ user_id: user.user_id, username: user.username, role: user.role }, SECRET_KEY, {
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
        const updateData = {
            skin_type: req.body.skinType,
            acne: req.body.skinProb?.acne || false,
            aging: req.body.skinProb?.aging || false,
            dried: req.body.skinProb?.dried || false,
            oily: req.body.skinProb?.oily || false,
            enlarged_pores: req.body.skinProb?.enlarged_pores || false,
            scarring: req.body.skinProb?.scarring || false,
            skin_recovery: req.body.skinProb?.skin_recovery || false,

            // Thành phần cần tránh (allergies)
            fragrance: req.body.allergies?.includes('fragrance') || false,
            alcohol: req.body.allergies?.includes('alcohol') || false,
            silicones: req.body.allergies?.includes('silicones') || false,
            parabens: req.body.allergies?.includes('parabens') || false,
            essential_oil: req.body.allergies?.includes('essential_oils') || false,
        };

        // Lọc bỏ các trường undefined (không được cung cấp trong request)
        Object.keys(updateData).forEach((key) => {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        });

        // Thực hiện cập nhật
        const [affectedRows] = await Users.update(updateData, {
            where: {
                user_id: req.body.user_id, // Sử dụng user_id thay vì username
            },
        });

        if (affectedRows === 0) {
            return res.status(404).send('Không tìm thấy người dùng để cập nhật');
        }

        res.status(200).json({
            success: true,
            message: 'Cập nhật thông tin thành công',
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
                user_id: req.body.user_id,
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
