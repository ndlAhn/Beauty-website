const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const Follower = sequelize.define(
        'follower',
        {
            follower_id: {
                type: DataTypes.STRING,
                primaryKey: true,
            },
            user_follow_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            timestamp: false,
        },
    );
    return Follower;
};
