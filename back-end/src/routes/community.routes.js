// Community Routes
const express = require('express');
const router = express.Router();
const communityPostController = require('../controller/communityPost.controller');
const communityCommentController = require('../controller/communityComment.controller');
const authJwt = require('../middleware/authJwt');

// Posts
router.post('/posts', authJwt, communityPostController.createPost);
router.get('/posts', communityPostController.getAllPosts);
router.post('/posts/:post_id/like', authJwt, communityPostController.likePost);
router.post('/posts/:post_id/unlike', authJwt, communityPostController.unlikePost);

// Comments
router.post('/posts/:post_id/comments', authJwt, communityCommentController.createComment);
router.get('/posts/:post_id/comments', communityCommentController.getCommentsByPost);

module.exports = router;
