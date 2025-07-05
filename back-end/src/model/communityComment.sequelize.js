// Sequelize model for CommunityComment
module.exports = (sequelize, DataTypes) => {
    const CommunityComment = sequelize.define(
        'CommunityComment',
        {
            comment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            post_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_id: {
                type: DataTypes.STRING, // Changed from INTEGER to STRING for UUID
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'community_comments',
            timestamps: false,
        },
    );
    return CommunityComment;
};
