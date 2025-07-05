// Community Post Controller
const CommunityPostService = require('../service/communityPost.service');

exports.createPost = (req, res) => {
    const user_id = req.user?.user_id;
    const { content, picture } = req.body;
    if (!user_id) return res.status(401).json({ error: 'Unauthorized' });
    CommunityPostService.createPost(user_id, content, picture, (err, result) => {
        if (err) {
            console.error('Error creating community post:', err);
            return res.status(500).json({ error: 'Failed to create post', details: err.message || err });
        }
        res.json(result);
    });
};

exports.getAllPosts = (req, res) => {
    CommunityPostService.getAllPosts((err, posts) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch posts' });
        res.json(posts);
    });
};

exports.likePost = (req, res) => {
    const { post_id } = req.params;
    const user_id = req.user?.user_id;
    if (!user_id) return res.status(401).json({ error: 'Unauthorized' });
    CommunityPostService.likePost(post_id, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to like post' });
        res.json({ success: true });
    });
};

exports.unlikePost = (req, res) => {
    const { post_id } = req.params;
    CommunityPostService.unlikePost(post_id, (err) => {
        if (err) return res.status(500).json({ error: 'Failed to unlike post' });
        res.json({ success: true });
    });
};
