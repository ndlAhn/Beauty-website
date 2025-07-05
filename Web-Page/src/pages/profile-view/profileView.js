import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import './profileView.css';
import React, { useEffect, useState } from 'react';
import { Avatar, Typography, Box, IconButton, Button, CircularProgress } from '@mui/material';
import CloudinaryUploadWidget from '../../components/cloudinaryUploadWidget/cloudinaryUploadWidget';
import CommunityPost from '../../components/community/CommunityPost';
import instance from '../../axios/instance';

function ProfileView() {
    const [avatarPublicId, setAvatarPublicId] = useState('');
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true);
            const userId = localStorage.getItem('userId');
            if (!userId) return;
            try {
                // Get user info
                const res = await instance.post('/get-user-data-by-id', { user_id: userId });
                setUser(res.data.data);
                setAvatarPublicId(res.data.data.avt_file_path || '');
                // Get user's posts
                const postsRes = await instance.get('/community/posts', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                });
                const userPosts = postsRes.data.filter((p) => p.user_id === userId);
                setPosts(userPosts);
            } catch (e) {
                setUser(null);
                setPosts([]);
            }
            setLoading(false);
        };
        fetchProfile();
    }, []);

    if (loading) return <CircularProgress sx={{ mt: 8 }} />;
    if (!user) return <Typography sx={{ mt: 8 }}>User not found.</Typography>;

    return (
        <div>
            <Header />
            <div>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    mt="50px"
                    minHeight="100vh"
                    bgcolor="#fff"
                >
                    <Box position="relative">
                        <Avatar
                            sx={{ width: 120, height: 120, bgcolor: '#dfb5b5' }}
                            src={
                                avatarPublicId
                                    ? `https://res.cloudinary.com/dppaihihm/image/upload/${avatarPublicId}.jpg`
                                    : undefined
                            }
                        />
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CloudinaryUploadWidget
                                uwConfig={{
                                    cloudName: 'dppaihihm',
                                    uploadPreset: 'Beauty Web',
                                }}
                                setPublicId={setAvatarPublicId}
                            />
                            {avatarPublicId && (
                                <Typography variant="caption" sx={{ mt: 1 }}>
                                    Avatar updated!
                                </Typography>
                            )}
                        </Box>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                bgcolor: '#fff',
                                borderRadius: '50%',
                                p: 0.5,
                            }}
                        ></IconButton>
                    </Box>

                    <Typography variant="h5" sx={{ mt: 2, color: '#3c4b57', fontWeight: 500 }}>
                        {user.name}
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#3c4b57', mt: 1 }}>
                        {user.bio || 'Share story or quote...'}
                    </Typography>

                    <Box display="flex" justifyContent="center" mt={3}>
                        {[
                            { label: 'Posts', value: posts.length },
                            { label: 'Followers', value: user.followers || 0 },
                            { label: 'Following', value: user.following || 0 },
                        ].map((item, index) => (
                            <Box key={index} mx={3} textAlign="center">
                                <Typography variant="h6" sx={{ color: '#3c4b57' }}>
                                    {item.value}
                                </Typography>
                                <Typography variant="h6" sx={{ color: '#3c4b57' }}>
                                    {item.label}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Follow Button (optional for other users) */}
                    {/* <Button ...>Follow</Button> */}

                    {/* Posts Section */}
                    <Box width="100%" maxWidth="800px" mt={4} px={2}>
                        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Typography variant="h5" sx={{ color: '#3c4b57' }}>
                                {user.name}'s posts:
                            </Typography>
                        </Box>
                        {posts.length === 0 ? (
                            <Typography>No posts yet.</Typography>
                        ) : (
                            posts.map((post) => <CommunityPost key={post.post_id} post={post} onAction={() => {}} />)
                        )}
                    </Box>
                </Box>
            </div>
            <Footer />
        </div>
    );
}

export default ProfileView;
