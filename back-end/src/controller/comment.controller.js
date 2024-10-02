module.exports = (app) => {
    const CommentService = require('../service/comment.service');
    var router = require('express').Router();
    router.post('/create-comment', CommentService.create);
    router.post('/get-comment-by-review', CommentService.getCommentByReview);
    
    app.use('/', router);
};
