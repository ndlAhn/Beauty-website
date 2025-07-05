import React, { useEffect, useState } from 'react';
import instance from '../../axios/instance';
import CommentSection from './CommentSection';
import { Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';

function CommunityPost({ post, onAction }) {
    const [likes, setLikes] = useState(post.likes);
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(false);
    const [user, setUser] = useState({ name: '', avt_file_path: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user info for this post
        const fetchUser = async () => {
            try {
                const res = await instance.post('/get-user-data-by-id', { user_id: post.user_id });
                setUser(res.data.data || { name: '', avt_file_path: '' });
            } catch (e) {
                setUser({ name: 'Unknown', avt_file_path: '' });
            }
        };
        fetchUser();
    }, [post.user_id]);

    const handleLike = async () => {
        const token = localStorage.getItem('token');
        await instance.post(
            `/community/posts/${post.post_id}/like`,
            {},
            { headers: { Authorization: `Bearer ${token}` } },
        );
        setLikes(likes + 1);
        setLiked(true);
        onAction();
    };

    return (
        <Card sx={{ mb: 2 }}>
            <CardHeader
                avatar={
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate(`/profile/${post.user_id}`)}>
                        {user.avt_file_path ? (
                            <Avatar
                                src={`https://res.cloudinary.com/dppaihihm/image/upload/${user.avt_file_path}.jpg`}
                            />
                        ) : (
                            <Avatar>{user.name ? user.name[0] : '?'}</Avatar>
                        )}
                    </span>
                }
                title={
                    <span
                        style={{ cursor: 'pointer', color: '#1976d2' }}
                        onClick={() => navigate(`/profile/${post.user_id}`)}
                    >
                        {user.name || `User ${post.user_id}`}
                    </span>
                }
                subheader={new Date(post.created_at).toLocaleString()}
            />
            <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                    {post.content}
                </Typography>
                {post.picture && (
                    <img
                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${post.picture}.jpg`}
                        alt="Post"
                        style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }}
                    />
                )}
            </CardContent>
            <CardActions>
                <IconButton onClick={handleLike} disabled={liked} color={liked ? 'primary' : 'default'}>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
                <Typography variant="body2">{likes}</Typography>
                <IconButton onClick={() => setShowComments((v) => !v)}>
                    <ChatBubbleOutlineIcon />
                </IconButton>
                <Typography variant="body2">Comments</Typography>
            </CardActions>
            {showComments && (
                <CardContent>
                    <CommentSection postId={post.post_id} />
                </CardContent>
            )}
        </Card>
    );
}

export default CommunityPost;
