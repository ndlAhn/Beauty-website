// Sequelize model for CommunityPost
module.exports = (sequelize, DataTypes) => {
    const CommunityPost = sequelize.define(
        'CommunityPost',
        {
            post_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.STRING, // Changed from INTEGER to STRING for UUID
                allowNull: false,
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            likes: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },
            created_at: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            tableName: 'community_posts',
            timestamps: false,
        },
    );
    return CommunityPost;
};
