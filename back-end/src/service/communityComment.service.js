// Community Comment Service
const CommunityComment = require('../model/communityComment.model');

const CommunityCommentService = {
    createComment: (post_id, user_id, content, callback) => {
        CommunityComment.create(post_id, user_id, content, callback);
    },
    getCommentsByPost: (post_id, callback) => {
        CommunityComment.getByPost(post_id, callback);
    },
};

module.exports = CommunityCommentService;
