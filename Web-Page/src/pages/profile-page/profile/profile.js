import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect, useState, useRef } from 'react';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import { BiEditAlt } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import React from 'react';
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
                            // Gọi callback với cả public_id và secure_url
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

    const handleUploadSuccess = (imageData) => {
        setNewImageData(imageData);
    };

    const handleOpenEditDialog = () => setOpenEditDialog(true);
    const handleCloseEditDialog = () => {
        setNewImageId('');
        setOpenEditDialog(false);
    };

    const handleSaveProfile = async () => {
        setIsSubmitting(true);
        try {
            const updateData = {
                name: displayName,
                bio: bio,
                ...(newImageData.publicId && { avatar: newImageData.publicId }),
            };

            const response = await instance.post('/update-info', {
                name: updateData.name,
                bio: updateData.bio,
                avt_path: updateData.avatar,
                user_id: state.userData?.userId,
            });

            if (response.data.success) {
                // dispatchState({
                //     type: 'UPDATE_USER',
                //     payload: {
                //         ...state.userData,
                //         ...updateData,
                //     },
                // });

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

    useEffect(() => {
        if (!state.userData?.userId) return; // Thêm điều kiện kiểm tra

        instance
            .post('/get-review-by-user-id', { user_id: state.userData.userId }) // Bỏ optional chaining
            .then((res) => {
                setReviews(res.data);
            })
            .catch((err) => {
                console.error('Error fetching reviews:', err);
                // Có thể thêm xử lý UI khi có lỗi
            });
    }, [state.userData?.userId]);

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
                                        : `https://res.cloudinary.com/dppaihihm/image/upload/${avatarUrl}.jpg`
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
                            <div className="count" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                                <label>0</label>
                                <label>Followers</label>
                            </div>
                            <div className="count" onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                                <label>0</label>
                                <label>Following</label>
                            </div>
                        </Box>

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
                                            newImageId
                                                ? `https://res.cloudinary.com/dppaihihm/image/upload/${newImageId}.jpg`
                                                : `https://res.cloudinary.com/dppaihihm/image/upload/${avatarUrl}.jpg`
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
                            {reviews?.map((item, index) => (
                                <div
                                    className="home-news"
                                    key={index}
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
