// Community Post Service
const CommunityPost = require('../model/communityPost.model');

const CommunityPostService = {
    createPost: (user_id, content, picture, callback) => {
        CommunityPost.create(user_id, content, picture, callback);
    },
    getAllPosts: (callback) => {
        CommunityPost.getAll(callback);
    },
    likePost: (post_id, callback) => {
        CommunityPost.like(post_id, callback);
    },
    unlikePost: (post_id, callback) => {
        CommunityPost.unlike(post_id, callback);
    },
};

module.exports = CommunityPostService;
