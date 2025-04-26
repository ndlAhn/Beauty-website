import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect, useState, useRef } from 'react';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
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
} from '@mui/material';
import { DialogTitle, DialogContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';

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

function Profile() {
    const [state, dispatchState] = useContext(StateContext);
    const [reviews, setReviews] = useState([]);
    const [followers, setFollowers] = useState([]);
    const [following, setFollowing] = useState([]);
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
    const navigate = useNavigate();

    // Fetch dữ liệu ban đầu
    useEffect(() => {
        if (!state.userData?.userId) return;

        // Fetch bài viết
        instance
            .post('/get-review-by-user-id', { user_id: state.userData.userId })
            .then((res) => setReviews(res.data))
            .catch(console.error);

        // Fetch followers
        instance
            .post('/get-followers', { user_id: state.userData.userId })
            .then((res) => setFollowers(res.data))
            .catch(console.error);

        // Fetch following
        instance
            .post('/get-following', { user_id: state.userData.userId })
            .then((res) => setFollowing(res.data))
            .catch(console.error);
    }, [state.userData?.userId]);

    const handleUploadSuccess = (imageData) => {
        setNewImageData(imageData);
        setNewImageId(imageData.publicId);
    };

    const handleOpenEditDialog = () => setOpenEditDialog(true);
    const handleCloseEditDialog = () => {
        setNewImageId('');
        setOpenEditDialog(false);
    };

    const handleFollowAction = async (targetUserId, action) => {
        try {
            await instance.post('/follow-action', {
                user_id: state.userData.userId,
                target_user_id: targetUserId,
                action: action,
            });
    
            // Update UI immediately
            if (action === 'follow') {
                setFollowers((prev) =>
                    prev.map((user) => (user.user_id === targetUserId ? { ...user, is_following: true } : user)),
                );
            } else {
                setFollowing((prev) => prev.filter((user) => user.user_id !== targetUserId));
            }
    
            setSnackbar({
                open: true,
                message: `Successfully ${action}ed`,  // Fixed template literal
                severity: 'success',
            });
        } catch (error) {
            console.error('Follow action error:', error);
            setSnackbar({
                open: true,
                message: `Failed to ${action}`,  // Fixed template literal
                severity: 'error',
            });
        }
    };

    const handleSaveProfile = async () => {
        setIsSubmitting(true);
        try {
            const updateData = {
                name: displayName,
                bio: bio,
                ...(newImageData.publicId && { avt_path: newImageData.publicId }),
            };

            const response = await instance.post('/update-info', {
                ...updateData,
                user_id: state.userData?.userId,
            });

            if (response.data.success) {
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
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    mt={2}
                                    mb={2}
                                    position="relative"
                                    sx={{ flexDirection: 'column', alignItems: 'center' }}
                                >
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
                                        uwConfig={{
                                            cloudName: 'dppaihihm',
                                            uploadPreset: 'Beauty Web',
                                        }}
                                        onUploadSuccess={handleUploadSuccess}
                                        disabled={isSubmitting}
                                    />
                                </Box>

                                <Typography variant="subtitle1" gutterBottom>
                                    About you:
                                </Typography>

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