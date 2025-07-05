// Community Comment Model
const db = require('./index');
const CommunityCommentModel = db.CommunityComment;

const CommunityComment = {
    create: (post_id, user_id, content, callback) => {
        CommunityCommentModel.create({ post_id, user_id, content })
            .then((comment) => callback(null, { comment_id: comment.comment_id }))
            .catch((err) => callback(err));
    },
    getByPost: (post_id, callback) => {
        CommunityCommentModel.findAll({ where: { post_id }, order: [['created_at', 'ASC']] })
            .then((comments) => callback(null, comments))
            .catch((err) => callback(err));
    },
};

module.exports = CommunityComment;
