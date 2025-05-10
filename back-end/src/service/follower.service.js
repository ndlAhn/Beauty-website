const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Follower = db.Follower;

exports.followUser = async (req, res) => {
    try {
        const newFollowerId = uuidv4();
        const newFollower = {
            follower_id: newFollowerId,
            user_follow_id: req.body.userFollowId,
            user_id: req.body.userId, // Giả sử bạn gửi cả user_id từ client
        };

        await Follower.create(newFollower);
        res.status(200).send('Follow user successfully');
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.unfollowUser = async (req, res) => {
    try {
        await Follower.destroy({
            where: {
                user_follow_id: req.body.userFollowId,
                user_id: req.body.userId,
            },
        });
        res.status(200).send('Unfollow user successfully');
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getFollowersByUser = async (req, res) => {
    try {
        const followers = await Follower.findAll({
            where: {
                user_follow_id: req.body.userId,
            },
            include: [
                {
                    model: db.Users,
                    as: 'User', // Tùy thuộc vào cách bạn đặt alias trong association
                },
            ],
        });
        res.status(200).send(followers);
    } catch (error) {
        console.error('Error getting followers:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.getFollowingByUser = async (req, res) => {
    try {
        const following = await Follower.findAll({
            where: {
                user_id: req.body.userId,
            },
            include: [
                {
                    model: db.Users,
                    as: 'UserFollow', // Tùy thuộc vào cách bạn đặt alias
                },
            ],
        });
        res.status(200).send(following);
    } catch (error) {
        console.error('Error getting following list:', error);
        res.status(500).send('Internal Server Error');
    }
};

exports.checkFollowStatus = async (req, res) => {
    try {
        const followStatus = await Follower.findOne({
            where: {
                user_id: req.body.userId,
                user_follow_id: req.body.userFollowId,
            },
        });

        res.status(200).send({
            isFollowing: !!followStatus,
        });
    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).send('Internal Server Error');
    }
};
