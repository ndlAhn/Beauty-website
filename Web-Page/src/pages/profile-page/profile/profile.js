import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import { BiEditAlt } from 'react-icons/bi';
import {
    Box,
    Typography,
    Divider,
    Avatar,
    Dialog,
    Tabs,
    Tab,
    Button,
    TextField,
    IconButton,
    CircularProgress,
    Snackbar,
    Alert,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    MenuItem,
    Select,
    Chip,
} from '@mui/material';
import { DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';
import CommunityPost from '../../../components/community/CommunityPost';

function formatDate(isoString) {
    const date = new Date(isoString);
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

const CloudinaryUploadWidget = ({ uwConfig, onUploadSuccess, disabled }) => {
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);

    const handleUploadClick = () => {
        if (uploadWidgetRef.current && !disabled) {
            uploadWidgetRef.current.open();
        }
    };

    useEffect(() => {
        const initializeUploadWidget = () => {
            if (window.cloudinary && uploadButtonRef.current) {
                uploadWidgetRef.current = window.cloudinary.createUploadWidget(
                    {
                        ...uwConfig,
                        cropping: true,
                        croppingAspectRatio: 1,
                        showSkipCropButton: false,
                        singleUploadAutoClose: true,
                    },
                    (error, result) => {
                        if (!error && result && result.event === 'success') {
                            onUploadSuccess({
                                publicId: result.info.public_id,
                                imageUrl: result.info.secure_url,
                            });
                        }
                    },
                );
            }
        };

        initializeUploadWidget();

        return () => {
            if (uploadWidgetRef.current) {
                uploadWidgetRef.current.destroy();
            }
        };
    }, [uwConfig, onUploadSuccess, disabled]);

    return (
        <Button
            variant="contained"
            onClick={handleUploadClick}
            ref={uploadButtonRef}
            disabled={disabled}
            sx={{ mt: 1 }}
        >
            Upload New Image
        </Button>
    );
};

const SKIN_TYPES = [
    { value: 'oily', label: 'Oily skin' },
    { value: 'dry', label: 'Dry skin' },
    { value: 'normal', label: 'Normal skin' },
    { value: 'combination', label: 'Combination skin' },
    { value: 'sensitive', label: 'Sensitive skin' },
    { value: 'acne_prone', label: 'Acne-prone skin' },
];
const SKIN_PROBLEMS = [
    { value: 'acne', label: 'Acne' },
    { value: 'aging', label: 'Aging' },
    { value: 'dried', label: 'Dried skin' },
    { value: 'oily', label: 'Oily skin' },
    { value: 'enlarged_pores', label: 'Enlarged pores' },
    { value: 'scarring', label: 'Scarring' },
    { value: 'skin_recovery', label: 'Skin recovery' },
];
const SKINCARE_GOALS = [
    { value: 'hydration', label: 'Hydration' },
    { value: 'acne_control', label: 'Acne Control' },
    { value: 'anti_aging', label: 'Anti-Aging' },
    { value: 'brightening', label: 'Brightening' },
    { value: 'oil_control', label: 'Oil Control' },
    { value: 'smooth_and_repair', label: 'Smooth & Repair' },
];

function Profile() {
    const { userId } = useParams();
    const [state, dispatchState] = useContext(StateContext);
    const [reviews, setReviews] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followCount, setFollowCount] = useState({ followers: 0, following: 0 });
    const cloudName = 'dppaihihm';
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0);
    const [avatarUrl, setAvatarUrl] = useState(state.userData?.avt_path);
    const [newImageId, setNewImageId] = useState('');
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [bio, setBio] = useState(state.userData?.bio || 'Share story or quote...');
    const [displayName, setDisplayName] = useState(state.userData?.name || '');
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success',
    });
    const [newImageData, setNewImageData] = useState({
        publicId: '',
        imageUrl: '',
    });
    const [skinType, setSkinType] = useState(state.userData?.skin_type || '');
    const [skinProblems, setSkinProblems] = useState(state.userData?.skinProblems || {});
    const [skincareGoals, setSkincareGoals] = useState(state.userData?.skincareGoals || {});
    const [allergies, setAllergies] = useState(state.userData?.allergies || []);
    const navigate = useNavigate();

    // Fetch dữ liệu ban đầu
    useEffect(() => {
        if (userId) {
            // Public profile view
            setLoading(true);
            instance
                .post('/get-user-data-by-id', { user_id: userId })
                .then((res) => {
                    setUser(res.data.data);
                    setFollowCount({
                        followers: res.data.data.followers || 0,
                        following: res.data.data.following || 0,
                    });
                    return instance.get('/community/posts', {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                    });
                })
                .then((postsRes) => {
                    const userPosts = postsRes.data.filter((p) => p.user_id === userId);
                    setPosts(userPosts);
                })
                .catch(() => {
                    setUser(null);
                    setPosts([]);
                })
                .finally(() => setLoading(false));
        } else if (state.userData?.user_id) {
            // Own profile view
            // Fetch bài viết
            instance
                .post('/get-review-by-user-id', { user_id: state.userData.user_id })
                .then((res) => setReviews(res.data))
                .catch(console.error);

            // Fetch followers
            instance
                .get(`/api/followers/followers/${state.userData.user_id}`)
                .then((res) => setFollowers(res.data))
                .catch(console.error);

            // Fetch following
            instance
                .get(`/api/followers/following/${state.userData.user_id}`)
                .then((res) => setFollowing(res.data))
                .catch(console.error);
        }
    }, [userId, state.userData?.user_id]);

    const handleUploadSuccess = (imageData) => {
        setNewImageData(imageData);
        setNewImageId(imageData.publicId);
    };

    const handleOpenEditDialog = () => setOpenEditDialog(true);
    const handleCloseEditDialog = () => {
        setNewImageId('');
        setOpenEditDialog(false);
    };

    const handleFollowAction = async (targetuser_id, action) => {
        try {
            await instance.post('/follow-action', {
                user_id: state.userData.user_id,
                target_user_id: targetuser_id,
                action: action,
            });

            // Update UI immediately
            if (action === 'follow') {
                setFollowers((prev) =>
                    prev.map((user) => (user.user_id === targetuser_id ? { ...user, is_following: true } : user)),
                );
            } else {
                setFollowing((prev) => prev.filter((user) => user.user_id !== targetuser_id));
            }

            setSnackbar({
                open: true,
                message: `Successfully ${action}ed`, // Fixed template literal
                severity: 'success',
            });
        } catch (error) {
            console.error('Follow action error:', error);
            setSnackbar({
                open: true,
                message: `Failed to ${action}`, // Fixed template literal
                severity: 'error',
            });
        }
    };

    // ...existing code...
const handleSaveProfile = async () => {
    setIsSubmitting(true);
    try {
        const updateData = {
            name: displayName,
            bio: bio,
            ...(newImageData.publicId && { avt_path: newImageData.publicId }),
            skin_type: skinType,
            skinProblems: skinProblems, // Đảm bảo trường này được gửi lên backend
            skincareGoals: skincareGoals,
            allergies: allergies,
        };

        const response = await instance.post('/update-info', {
            ...updateData,
            user_id: state.userData?.user_id,
        });

        if (response.data.success) {
            // Cập nhật lại state front-end
            dispatchState({
                type: 'UPDATE_USER',
                payload: {
                    ...state.userData,
                    ...updateData,
                },
            });

            setSnackbar({
                open: true,
                message: 'Profile updated successfully!',
                severity: 'success',
            });
            handleCloseEditDialog();
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        setSnackbar({
            open: true,
            message: 'Failed to update profile. Please try again.',
            severity: 'error',
        });
    } finally {
        setIsSubmitting(false);
    }
};
// ...existing code...

    // Add this for public profile follow button
    const handleFollow = async () => {
        try {
            const token = localStorage.getItem('token');
            const currentUserId = localStorage.getItem('userId');
            await instance.post(
                '/api/followers/follow',
                { userId: currentUserId, userFollowId: userId },
                { headers: { Authorization: `Bearer ${token}` } },
            );
            setIsFollowing(true);
            setFollowCount((prev) => ({ ...prev, followers: prev.followers + 1 }));
        } catch (e) {
            // handle error
        }
    };

    // Render logic
    if (userId) {
        // Public profile view
        if (loading) return <CircularProgress sx={{ mt: 8 }} />;
        if (!user) return <Typography sx={{ mt: 8 }}>User not found.</Typography>;
        return (
            <Box display="flex" flexDirection="column" alignItems="center" mt="50px" minHeight="100vh" bgcolor="#fff">
                <Button variant="outlined" sx={{ alignSelf: 'flex-start', ml: 2, mb: 2 }} onClick={() => navigate(-1)}>
                    Back
                </Button>
                <Avatar
                    sx={{ width: 120, height: 120, bgcolor: '#dfb5b5' }}
                    src={
                        user.avt_file_path
                            ? `https://res.cloudinary.com/dppaihihm/image/upload/${user.avt_file_path}.jpg`
                            : undefined
                    }
                />
                <Typography variant="h5" sx={{ mt: 2, color: '#3c4b57', fontWeight: 500 }}>
                    {user.name}
                </Typography>
                <Typography variant="h6" sx={{ color: '#3c4b57', mt: 1 }}>
                    {user.bio || 'Share story or quote...'}
                </Typography>
                <Box display="flex" justifyContent="center" mt={3}>
                    {['Posts', 'Followers', 'Following'].map((label, index) => (
                        <Box key={index} mx={3} textAlign="center">
                            <Typography variant="h6" sx={{ color: '#3c4b57' }}>
                                {label === 'Posts'
                                    ? posts.length
                                    : label === 'Followers'
                                    ? followCount.followers
                                    : followCount.following}
                            </Typography>
                            <Typography variant="h6" sx={{ color: '#3c4b57' }}>
                                {label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        backgroundColor: '#DFB5B5',
                        color: '#3c4b57',
                        borderRadius: '20px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        '&:hover': { backgroundColor: '#8a4040' },
                    }}
                    onClick={handleFollow}
                    disabled={isFollowing}
                >
                    {isFollowing ? 'Following' : 'Follow'}
                </Button>
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
        );
    }

    return (
        <div>
            <SubHeader />
            <div className="profile-wrap">
                <ProfileSidebar />
                <div className="profile-content-wrap">
                    <div className="profile-content">
                        <div className="user-profile">
                            <Avatar
                                src={
                                    newImageId
                                        ? `https://res.cloudinary.com/dppaihihm/image/upload/${newImageId}.jpg`
                                        : avatarUrl
                                        ? `https://res.cloudinary.com/dppaihihm/image/upload/${avatarUrl}.jpg`
                                        : '/default-avatar.jpg'
                                }
                                alt="Profile Avatar"
                                sx={{
                                    width: 120,
                                    height: 120,
                                    cursor: 'pointer',
                                }}
                                onClick={handleOpenEditDialog}
                            />
                            <div className="profile-name">
                                <Typography variant="h6" className="profile-username">
                                    {state.userData?.name}
                                </Typography>
                                <Typography variant="subtitle1" className="profile-username">
                                    @{state.userData?.username}
                                </Typography>
                            </div>
                        </div>

                        <Box className="post-fler-flwing" display="flex" gap={4}>
                            <div className="count">
                                <label>{reviews.length}</label>
                                <label>Posts</label>
                            </div>
                            <div
                                className="count"
                                onClick={() => {
                                    setTabIndex(0);
                                    setOpen(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <label>{followers.length}</label>
                                <label>Followers</label>
                            </div>
                            <div
                                className="count"
                                onClick={() => {
                                    setTabIndex(1);
                                    setOpen(true);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <label>{following.length}</label>
                                <label>Following</label>
                            </div>
                        </Box>

                        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
                            <Box
                                display="flex"
                                alignItems="center"
                                justifyContent="space-between"
                                sx={{ backgroundColor: '#d7bcbc' }}
                            >
                                <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)} variant="fullWidth">
                                    <Tab label={`Followers (${followers.length})`} />
                                    <Tab label={`Following (${following.length})`} />
                                </Tabs>
                                <IconButton onClick={() => setOpen(false)} sx={{ mr: 1 }}>
                                    <CloseIcon />
                                </IconButton>
                            </Box>

                            <DialogContent sx={{ p: 0 }}>
                                {tabIndex === 0 ? (
                                    followers.length > 0 ? (
                                        followers.map((follower) => (
                                            <Box
                                                key={follower.user_id}
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                p={2}
                                                sx={{
                                                    borderBottom: '1px solid #eee',
                                                    '&:hover': { backgroundColor: '#f9f9f9' },
                                                }}
                                            >
                                                <Box
                                                    display="flex"
                                                    alignItems="center"
                                                    gap={2}
                                                    sx={{ cursor: 'pointer' }}
                                                    onClick={() => {
                                                        navigate(`/user/${follower.user_id}`);
                                                        setOpen(false);
                                                    }}
                                                >
                                                    <Avatar
                                                        src={
                                                            follower.avt_path
                                                                ? `https://res.cloudinary.com/dppaihihm/image/upload/${follower.avt_path}.jpg`
                                                                : '/default-avatar.jpg'
                                                        }
                                                        sx={{ width: 40, height: 40 }}
                                                    />
                                                    <Box>
                                                        <Typography fontWeight="bold">{follower.name}</Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            @{follower.username}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Button
                                                    variant={follower.is_following ? 'outlined' : 'contained'}
                                                    size="small"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFollowAction(
                                                            follower.user_id,
                                                            follower.is_following ? 'unfollow' : 'follow',
                                                        );
                                                    }}
                                                    sx={{
                                                        minWidth: 100,
                                                        backgroundColor: follower.is_following
                                                            ? 'transparent'
                                                            : 'primary.main',
                                                        '&:hover': {
                                                            backgroundColor: follower.is_following
                                                                ? 'transparent'
                                                                : 'primary.dark',
                                                        },
                                                    }}
                                                >
                                                    {follower.is_following ? 'Following' : 'Follow'}
                                                </Button>
                                            </Box>
                                        ))
                                    ) : (
                                        <Box display="flex" justifyContent="center" p={3}>
                                            <Typography color="text.secondary">No followers yet</Typography>
                                        </Box>
                                    )
                                ) : following.length > 0 ? (
                                    following.map((followedUser) => (
                                        <Box
                                            key={followedUser.user_id}
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="space-between"
                                            p={2}
                                            sx={{
                                                borderBottom: '1px solid #eee',
                                                '&:hover': { backgroundColor: '#f9f9f9' },
                                            }}
                                        >
                                            <Box
                                                display="flex"
                                                alignItems="center"
                                                gap={2}
                                                sx={{ cursor: 'pointer' }}
                                                onClick={() => {
                                                    navigate(`/user/${followedUser.user_id}`);
                                                    setOpen(false);
                                                }}
                                            >
                                                <Avatar
                                                    src={
                                                        followedUser.avt_path
                                                            ? `https://res.cloudinary.com/dppaihihm/image/upload/${followedUser.avt_path}.jpg`
                                                            : '/default-avatar.jpg'
                                                    }
                                                    sx={{ width: 40, height: 40 }}
                                                />
                                                <Box>
                                                    <Typography fontWeight="bold">{followedUser.name}</Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        @{followedUser.username}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Button
                                                variant="outlined"
                                                size="small"
                                                color="error"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleFollowAction(followedUser.user_id, 'unfollow');
                                                }}
                                                sx={{ minWidth: 100 }}
                                            >
                                                Unfollow
                                            </Button>
                                        </Box>
                                    ))
                                ) : (
                                    <Box display="flex" justifyContent="center" p={3}>
                                        <Typography color="text.secondary">Not following anyone yet</Typography>
                                    </Box>
                                )}
                            </DialogContent>
                        </Dialog>

                        <div className="story">
                            <div className="story-text-box">
                                <Typography className="story-text">{bio}</Typography>
                            </div>
                            <div className="edit-story-box">
                                <BiEditAlt
                                    className="edit-story"
                                    onClick={handleOpenEditDialog}
                                    style={{ cursor: 'pointer' }}
                                />
                            </div>
                        </div>

                        <Dialog open={openEditDialog} onClose={handleCloseEditDialog} fullWidth maxWidth="sm">
                            <DialogTitle>
                                <Box display="flex" justifyContent="space-between" alignItems="center">
                                    <Button onClick={handleCloseEditDialog} color="primary">
                                        Cancel
                                    </Button>
                                    <Typography variant="h6" component="span">
                                        Edit Profile
                                    </Typography>
                                    <Button
                                        onClick={handleSaveProfile}
                                        color="primary"
                                        variant="contained"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? <CircularProgress size={24} /> : 'Save'}
                                    </Button>
                                </Box>
                            </DialogTitle>

                            <Divider />

                            <DialogContent>
                                <Box display="flex" flexDirection="column" alignItems="center">
                                    <Avatar
                                        src={
                                            newImageData.imageUrl ||
                                            (avatarUrl
                                                ? `https://res.cloudinary.com/dppaihihm/image/upload/${avatarUrl}.jpg`
                                                : '/default-avatar.jpg')
                                        }
                                        alt="Profile Avatar"
                                        sx={{ width: 120, height: 120, marginBottom: '10px' }}
                                    />
                                    <CloudinaryUploadWidget
                                        uwConfig={{ cloudName: 'dppaihihm', uploadPreset: 'Beauty Web' }}
                                        onUploadSuccess={handleUploadSuccess}
                                        disabled={isSubmitting}
                                    />
                                </Box>
                                <TextField
                                    label="Name"
                                    fullWidth
                                    margin="normal"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                />
                                <TextField
                                    label="Bio"
                                    fullWidth
                                    margin="normal"
                                    multiline
                                    rows={4}
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Share story or quote..."
                                />
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <FormLabel>Skin type</FormLabel>
                                    <Select value={skinType} onChange={(e) => setSkinType(e.target.value)}>
                                        {SKIN_TYPES.map((type) => (
                                            <MenuItem key={type.value} value={type.value}>
                                                {type.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <FormLabel>Skin problems</FormLabel>
                                    <FormGroup>
                                        {SKIN_PROBLEMS.map((problem) => (
                                            <FormControlLabel
                                                key={problem.value}
                                                control={
                                                    <Checkbox
                                                        checked={!!skinProblems[problem.value]}
                                                        onChange={() =>
                                                            setSkinProblems((sp) => ({
                                                                ...sp,
                                                                [problem.value]: !sp[problem.value],
                                                            }))
                                                        }
                                                    />
                                                }
                                                label={problem.label}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <FormLabel>Skincare goals</FormLabel>
                                    <FormGroup>
                                        {SKINCARE_GOALS.map((goal) => (
                                            <FormControlLabel
                                                key={goal.value}
                                                control={
                                                    <Checkbox
                                                        checked={!!skincareGoals[goal.value]}
                                                        onChange={() =>
                                                            setSkincareGoals((sg) => ({
                                                                ...sg,
                                                                [goal.value]: !sg[goal.value],
                                                            }))
                                                        }
                                                    />
                                                }
                                                label={goal.label}
                                            />
                                        ))}
                                    </FormGroup>
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <FormLabel>Allergies</FormLabel>
                                    <TextField
                                        label="Allergies (comma separated)"
                                        value={allergies.join(', ')}
                                        onChange={(e) => setAllergies(e.target.value.split(',').map((a) => a.trim()))}
                                        fullWidth
                                    />
                                </FormControl>
                            </DialogContent>
                        </Dialog>

                        <Divider sx={{ my: 2, borderColor: 'primary.main' }} />

                        <Typography variant="h5" gutterBottom>
                            Recent Posts
                        </Typography>
                        <div className="pro5-post">
                            {reviews?.map((item) => (
                                <div
                                    className="home-news"
                                    key={item.review_id}
                                    onClick={() => navigate(`/review-detail/${item.review_id}`)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <div className="home-new-picture">
                                        <img
                                            className="review-poster"
                                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${item.img_path}.jpg`}
                                            alt={item.title}
                                        />
                                    </div>
                                    <Typography className="home-new-title">{item.title}</Typography>
                                    <Typography className="home-review-title">
                                        Post date: {formatDate(item.createdAt)}
                                    </Typography>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>
    );
}

export default Profile;
