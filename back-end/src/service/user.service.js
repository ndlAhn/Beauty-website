require('dotenv').config();
const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Users = db.Users;
const SECRET_KEY = process.env.JWT_SECRET || 'default_secret';
const Alergic = db.Alergic;
const Ingredient = db.Ingredients;

// Helper function to handle errors
const handleError = (res, error, message = 'Internal Server Error') => {
    console.error(`${message}:`, error);
    res.status(500).json({ success: false, message });
};

exports.create = async (req, res) => {
    try {
        const {
            name,
            username,
            password,
            dob,
            gender,
            avt_file_path,
            skin_type,
            acne_prone,
            dull_skin,
            large_pores,
            uneven,
            dark_spot,
            redness,
            dehydrated,
            wrinkles,
            hydration,
            acne_control,
            anti_aging,
            brightening,
            oil_control,
            smooth_and_repair,
        } = req.body;

        if (!name || !username || !password || !dob || !gender || !skin_type) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        const existingUser = await Users.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'Username already exists',
            });
        }

        const newUserId = uuidv4();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            user_id: newUserId,
            name,
            username,
            password: hashedPassword,
            dob,
            gender,
            avt_file_path: avt_file_path || null,
            skin_type,
            acne_prone: acne_prone || false,
            dull_skin: dull_skin || false,
            large_pores: large_pores || false,
            uneven: uneven || false,
            dark_spot: dark_spot || false,
            redness: redness || false,
            dehydrated: dehydrated || false,
            wrinkles: wrinkles || false,
            hydration: hydration || false,
            acne_control: acne_control || false,
            anti_aging: anti_aging || false,
            brightening: brightening || false,
            oil_control: oil_control || false,
            smooth_and_repair: smooth_and_repair || false,
        });

        // Omit sensitive data from response
        const { password: _, ...userData } = newUser.get({ plain: true });

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: userData,
        });
    } catch (error) {
        handleError(res, error, 'Error creating user');
    }
};

exports.authenticate = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required',
            });
        }

        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                username: user.username,
                role: user.role,
            },
            SECRET_KEY,
            { expiresIn: '10d' },
        );

        // Omit sensitive data from response
        const { password: _, ...userData } = user.get({ plain: true });

        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            token,
            data: userData,
        });
    } catch (error) {
        handleError(res, error, 'Error during authentication');
    }
};

exports.getAll = async (req, res) => {
    try {
        const { currentUsername } = req.body;

        if (!currentUsername) {
            return res.status(400).json({
                success: false,
                message: 'Current username is required',
            });
        }

        const users = await Users.findAll({
            where: { username: { [Op.not]: currentUsername } },
            attributes: ['user_id', 'name', 'username', 'gender', 'dob', 'role', 'bio', 'avt_path'],
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        handleError(res, error, 'Error retrieving users');
    }
};

exports.update = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { user_id, skinType, skinProb, skinGoals, allergies } = req.body;

        if (!user_id) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }

        const user = await Users.findByPk(user_id, { transaction });
        if (!user) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Prepare update data
        const updateData = {
            ...(skinType !== undefined && { skin_type: skinType }),
            ...(skinProb && {
                acne: skinProb.acne || false,
                aging: skinProb.aging || false,
                dried: skinProb.dried || false,
                oily: skinProb.oily || false,
                enlarged_pores: skinProb.enlarged_pores || false,
                scarring: skinProb.scarring || false,
                skin_recovery: skinProb.skin_recovery || false,
            }),
            ...(skinGoals && {
                hydration: skinGoals.hydration || null,
                acne_control: skinGoals.acne_control || false,
                anti_aging: skinGoals.anti_aging || false,
                brightening: skinGoals.brightening || false,
                oil_control: skinGoals.oil_control || false,
                smooth_and_repair: skinGoals.smooth_and_repair || false,
            }),
        };

        await Users.update(updateData, {
            where: { user_id },
            transaction,
        });

        // Process allergies
        if (Array.isArray(allergies)) {
            await Alergic.destroy({
                where: { user_id },
                transaction,
            });

            if (allergies.length > 0) {
                const allergiesToAdd = allergies.map((ingredient_id) => ({
                    alergic_id: uuidv4(),
                    user_id,
                    ingredient_id,
                }));
                await Alergic.bulkCreate(allergiesToAdd, { transaction });
            }
        }

        await transaction.commit();

        const updatedUser = await Users.findByPk(user_id, {
            include: [
                {
                    model: Ingredient,
                    as: 'allergies',
                    through: { attributes: [] },
                    attributes: ['ingredient_id', 'name'],
                },
            ],
        });

        res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: updatedUser,
        });
    } catch (err) {
        await transaction.rollback();
        handleError(res, err, 'Error updating user information');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user_id = req.params.user_id || req.body.user_id;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }

        const user = await Users.findByPk(user_id, {
            include: [
                {
                    model: Alergic,
                    as: 'alergics',
                    include: [
                        {
                            model: Ingredient,
                            as: 'ingredient',
                            attributes: ['ingredient_id', 'name'],
                        },
                    ],
                    attributes: ['alergic_id'],
                },
            ],
            attributes: { exclude: ['password'] },
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        // Format the response to match the expected structure
        const formattedUser = {
            ...user.get({ plain: true }),
            allergies: user.alergics?.map((allergy) => allergy.ingredient),
        };

        res.status(200).json({
            success: true,
            data: formattedUser,
        });
    } catch (err) {
        handleError(res, err, 'Error getting user');
    }
};

exports.updateInfo = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        const { user_id, name, bio, avt_path, ...skinGoals } = req.body;

        if (!user_id) {
            await transaction.rollback();
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }

        const user = await Users.findByPk(user_id, { transaction });
        if (!user) {
            await transaction.rollback();
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const updateData = {
            ...(name !== undefined && { name }),
            ...(bio !== undefined && { bio }),
            ...(avt_path !== undefined && { avt_path }),
            ...(skinGoals.hydration !== undefined && { hydration: skinGoals.hydration }),
            ...(skinGoals.acne_control !== undefined && { acne_control: skinGoals.acne_control }),
            ...(skinGoals.anti_aging !== undefined && { anti_aging: skinGoals.anti_aging }),
            ...(skinGoals.brightening !== undefined && { brightening: skinGoals.brightening }),
            ...(skinGoals.oil_control !== undefined && { oil_control: skinGoals.oil_control }),
            ...(skinGoals.smooth_and_repair !== undefined && { smooth_and_repair: skinGoals.smooth_and_repair }),
        };

        await user.update(updateData, { transaction });
        await transaction.commit();

        const updatedUser = await Users.findByPk(user_id, {
            attributes: { exclude: ['password'] },
        });

        res.status(200).json({
            success: true,
            message: 'User info updated successfully',
            data: updatedUser,
        });
    } catch (err) {
        await transaction.rollback();
        handleError(res, err, 'Error updating user info');
    }
};

exports.handleSurvey = async (req, res) => {
    try {
        const { user_id, skinType, skinProb, skinGoals, allergies } = req.body;

        if (!user_id) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required',
            });
        }

        const user = await Users.findByPk(user_id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const updateData = {
            skin_type: skinType || null,
            ...(skinProb && {
                acne: skinProb.acne || false,
                aging: skinProb.aging || false,
                dried: skinProb.dried || false,
                oily: skinProb.oily || false,
                enlarged_pores: skinProb.enlarged_pores || false,
                scarring: skinProb.scarring || false,
                skin_recovery: skinProb.skin_recovery || false,
            }),
            ...(skinGoals && {
                hydration: skinGoals.hydration || null,
                acne_control: skinGoals.acne_control || false,
                anti_aging: skinGoals.anti_aging || false,
                brightening: skinGoals.brightening || false,
                oil_control: skinGoals.oil_control || false,
                smooth_and_repair: skinGoals.smooth_and_repair || false,
            }),
        };

        // Always set skin_type to a valid value if missing
        if (!updateData.skin_type) {
            updateData.skin_type = user.skin_type || 'normal';
        }
        await Users.update(updateData, {
            where: { user_id },
            validate: false,
        });

        // Process allergies
        if (Array.isArray(allergies)) {
            await Alergic.destroy({
                where: { user_id },
            });

            if (allergies.length > 0) {
                const allergiesToAdd = allergies.map((ingredient_id) => ({
                    alergic_id: uuidv4(),
                    user_id,
                    ingredient_id,
                }));
                await Alergic.bulkCreate(allergiesToAdd);
            }
        }

        const updatedUser = await Users.findByPk(user_id, {
            attributes: { exclude: ['password'] },
        });

        // If skin_type is still null after update, set it to a default (e.g., 'normal')
        const updatedUserCheck = await Users.findByPk(user_id);
        if (!updatedUserCheck.skin_type) {
            await updatedUserCheck.update({ skin_type: 'normal' });
        }

        res.status(200).json({
            success: true,
            message: 'Survey data saved successfully',
            data: updatedUser,
        });
    } catch (err) {
        handleError(res, err, 'Error saving survey data');
    }
};
