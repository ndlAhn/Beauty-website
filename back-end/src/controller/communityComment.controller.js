// Community Comment Controller
const CommunityCommentService = require('../service/communityComment.service');

exports.createComment = (req, res) => {
    const { post_id } = req.params;
    const user_id = req.user?.user_id;
    const { content } = req.body;
    if (!user_id) return res.status(401).json({ error: 'Unauthorized' });
    CommunityCommentService.createComment(post_id, user_id, content, (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to add comment' });
        res.json(result);
    });
};

exports.getCommentsByPost = (req, res) => {
    const { post_id } = req.params;
    CommunityCommentService.getCommentsByPost(post_id, (err, comments) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch comments' });
        res.json(comments);
    });
};
