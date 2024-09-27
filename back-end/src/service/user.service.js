const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Users = db.Users;

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        // const newUserId = uuidv4();
        // const newUser = {
        //     user_id: newUserId,
        //     name: req.body.name,
        //     username: req.body.username,
        //     password: req.body.password,
        //     dob: req.body.dob,
        //     gender: req.body.gender,
        // };
        // await Users.create(newUser);
        res.status(200).send(req.body);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.authenticate = async (req, res) => {
    Users.findOne({
        where: {
            username: req.body.username,
        },
    })
        .then((result) => {
            const userData = result.dataValues;

            if (userData.password === req.body.password) {
                const responseData = {
                    userId: userData.user_id,
                    name: userData.name,
                    username: userData.username,
                    gender: userData.gender,
                    dob: userData.dob,
                    role: userData.role,
                };
                res.status(200).json({
                    message: 'Authentication successful',
                    userData: responseData,
                });
            } else {
                res.status(401).json({
                    message: 'Authentication failed',
                    error: 'Invalid password',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving User.',
            });
        });
};

exports.getAll = async (req, res) => {
    Users.findAll({
        where: {
            username: {
                [Op.not]: req.body.currentUsername,
            },
        },
    })
        .then((result) => {
            // const userData = result;
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving User.',
            });
        });
};
