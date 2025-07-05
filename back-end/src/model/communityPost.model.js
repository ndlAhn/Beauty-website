// Community Post Model
const db = require('./index');
const CommunityPostModel = db.CommunityPost;

const CommunityPost = {
    create: (user_id, content, picture, callback) => {
        CommunityPostModel.create({ user_id, content, picture })
            .then((post) => callback(null, { post_id: post.post_id }))
            .catch((err) => callback(err));
    },
    getAll: (callback) => {
        CommunityPostModel.findAll({ order: [['created_at', 'DESC']] })
            .then((posts) => callback(null, posts))
            .catch((err) => callback(err));
    },
    like: (post_id, callback) => {
        CommunityPostModel.increment('likes', { by: 1, where: { post_id } })
            .then(() => callback(null))
            .catch((err) => callback(err));
    },
    unlike: (post_id, callback) => {
        CommunityPostModel.decrement('likes', { by: 1, where: { post_id, likes: { [db.Sequelize.Op.gt]: 0 } } })
            .then(() => callback(null))
            .catch((err) => callback(err));
    },
};

module.exports = CommunityPost;
