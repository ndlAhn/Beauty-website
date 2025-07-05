import React, { useEffect, useState } from 'react';
import instance from '../../axios/instance';
import { Box, TextField, Button, Stack, Typography, Avatar, Paper } from '@mui/material';

function CommentSection({ postId }) {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userMap, setUserMap] = useState({});

    const fetchComments = async () => {
        const res = await instance.get(`/community/posts/${postId}/comments`);
        const comments = res.data;
        // Fetch user info for all unique user_ids
        const userIds = [...new Set(comments.map((c) => c.user_id))];
        const userMapTemp = {};
        await Promise.all(
            userIds.map(async (uid) => {
                try {
                    const res = await instance.post('/get-user-data-by-id', { user_id: uid });
                    userMapTemp[uid] = res.data.data || { name: '', avt_file_path: '' };
                } catch {
                    userMapTemp[uid] = { name: 'Unknown', avt_file_path: '' };
                }
            }),
        );
        setUserMap(userMapTemp);
        setComments(comments);
    };

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem('token');
        await instance.post(
            `/community/posts/${postId}/comments`,
            { content },
            { headers: { Authorization: `Bearer ${token}` } },
        );
        setContent('');
        setIsSubmitting(false);
        fetchComments();
    };

    return (
        <Box sx={{ mt: 2 }}>
            <form onSubmit={handleSubmit}>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <TextField
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Add a comment..."
                        size="small"
                        fullWidth
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isSubmitting || !content.trim()}
                    >
                        {isSubmitting ? 'Posting...' : 'Comment'}
                    </Button>
                </Stack>
            </form>
            <Stack spacing={1}>
                {comments.map((comment) => {
                    const user = userMap[comment.user_id] || { name: '', avt_file_path: '' };
                    return (
                        <Paper
                            key={comment.comment_id}
                            sx={{ p: 1, display: 'flex', alignItems: 'center' }}
                            elevation={1}
                        >
                            {user.avt_file_path ? (
                                <Avatar
                                    sx={{ width: 28, height: 28, mr: 1 }}
                                    src={`https://res.cloudinary.com/dppaihihm/image/upload/${user.avt_file_path}.jpg`}
                                />
                            ) : (
                                <Avatar sx={{ width: 28, height: 28, mr: 1 }}>{user.name ? user.name[0] : '?'}</Avatar>
                            )}
                            <Typography variant="body2">
                                <b>{user.name ? user.name : `User ${comment.user_id}`}:</b> {comment.content}
                            </Typography>
                        </Paper>
                    );
                })}
            </Stack>
        </Box>
    );
}

export default CommentSection;
