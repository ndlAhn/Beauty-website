import './profile.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ProfileSidebar from '../../../components/sidebar/profile-sidebar/profileSidebar';
import { useContext, useEffect, useState } from 'react';
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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Button
  } from '@mui/material';
  import {
 
    DialogTitle,
    DialogContent,
    DialogActions,


  } from '@mui/material';

import {TextField } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PersonIcon from '@mui/icons-material/Person';


function formatDate(isoString) {
    
    const date = new Date(isoString);

    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', options).replace(',', '');
}

function Profile() {
    // Following, follower
    const [open, setOpen] = useState(false);
    const [tabIndex, setTabIndex] = useState(0); // 0: Follower, 1: Following

    const handleOpen = (index) => {
        setTabIndex(index);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

  

    //--
  //Edit pro5
    const [avatarUrl, setAvatarUrl] = useState('https://via.placeholder.com/120'); // ảnh mặc định

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [bio, setBio] = useState('Share story or quote...');
    const [displayName, setDisplayName] = useState('');



    const handleOpenEditDialog = () => setOpenEditDialog(true);
    const handleCloseEditDialog = () => setOpenEditDialog(false);
    const handleSaveProfile = () => {
    // Add your save logic here
    handleCloseEditDialog();
  };
  
  //--
  // xử lý upload ảnh
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatarUrl(imageUrl);
  
      // Optional: upload lên Cloudinary hoặc server tại đây
    }
  };
//--  
    const test = {};
    const [state, dispatchState] = useContext(StateContext);

    const [reviews, setReviews] = useState([]);
    const cloudName = 'dppaihihm';
    const navigate = useNavigate();
    useEffect(() => {
        console.log(state);
        instance
            .post('/get-review-by-user-id', { user_id: state.userData.userId })
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div>
            <SubHeader />
            <div className="profile-wrap">
                <ProfileSidebar />
                <div className="profile-content-wrap">
                    <div className="profile-content">
                        <div className="user-profile">
                            <label htmlFor="profileImageUpload">
                                <img
                                    className="profile-img"
                                    src={
                                        'https://t3.ftcdn.net/jpg/02/09/37/00/360_F_209370065_JLXhrc5inEmGl52SyvSPeVB23hB6IjrR.jpg'
                                    }
                                    alt="Profile"
                                />
                            </label>
                            <div className="profile-name">
                                <label className="profile-username">{state.userData?.name}</label>
                                <label className="profile-username">{state.userData?.username}</label>
                            </div>
                        </div>
                        {/* Design dialog for fler&flwing */}
                        {/* <div className="post-fler-flwing">
                            <div className="count">
                                <label>0</label>
                                <label>Posts</label>
                            </div>
                            <div className="count">
                                <label>0</label>
                                <label>Followers</label>
                            </div>
                            <div className="count">
                                <label>0</label>
                                <label>Following</label>
                            </div>
                        </div> */}
                                    <Box>
      {/* Cụm count */}
      <Box className="post-fler-flwing" display="flex" gap={4}>
        <div className="count">
          <label>0</label>
          <label>Posts</label>
        </div>
        <div className="count" onClick={() => handleOpen(0)} style={{ cursor: 'pointer' }}>
          <label>0</label>
          <label>Followers</label>
        </div>
        <div className="count" onClick={() => handleOpen(1)} style={{ cursor: 'pointer' }}>
          <label>0</label>
          <label>Following</label>
        </div>
      </Box>

      {/* Dialog với Tabs */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        {/* Tabs header */}
        <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ backgroundColor: '#d7bcbc' }}>
          <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
            <Tab label="Follower" />
            <Tab label="Following" />
          </Tabs>
          <IconButton onClick={handleClose} sx={{ mr: 1 }}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent>
          {tabIndex === 0 && (
            <Box display="flex" alignItems="center" gap={2}>
              <PersonIcon color="disabled" />
              <Typography>Follower’s name</Typography>
              <Button variant="outlined" size="small">Unfollow</Button>
            </Box>
          )}

          {tabIndex === 1 && (
            <Box display="flex" alignItems="center" gap={2}>
              <PersonIcon color="disabled" />
              <Typography>Following’s name</Typography>
              <Button variant="outlined" size="small" color="error">Delete</Button>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Box>
                        
                        {/* Design UI for Edit screen: avatar, name, bio*/}
                        <div className="story">
                            <div className="story-text-box">
                                <label className="story-text">{bio}</label>
                            </div>
                            <div className="edit-story-box">
                                <BiEditAlt className="edit-story" 
                                    onClick={handleOpenEditDialog}
                                    style={{ cursor: 'pointer' }} />
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
                        >
                            Save
                        </Button>
                    </Box>
                </DialogTitle>
                
                <Divider />
                
                <DialogContent>
                <Box display="flex" justifyContent="center" mt={2} mb={2} position="relative">
    <Avatar
      src={avatarUrl}
      alt="Profile Avatar"
      sx={{ width: 120, height: 120 }}
    />
    <label htmlFor="avatar-upload">
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          right: 'calc(50% - 60px)',
          backgroundColor: '#fff',
          borderRadius: '50%',
          padding: '6px',
          cursor: 'pointer',
          boxShadow: 2,
        }}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/747/747545.png"
          alt="Upload"
          width={20}
          height={20}
        />
      </Box>
    </label>
    <input
      id="avatar-upload"
      type="file"
      accept="image/*"
      style={{ display: 'none' }}
      onChange={handleAvatarChange}
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
                   
                        
                        <hr style={{ color: 'var(--text-color-blue)' }} />
                        <h4>Recent Posts</h4>
                        <div className="pro5-post">
                            {reviews?.map((item, index) => (
                                <div
                                    className="home-news"
                                    key={index}
                                    onClick={() => navigate(`/review-detail/${item.review_id}`)}
                                >
                                    <div className="home-new-picture">
                                        <img
                                            className="review-poster"
                                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${item.img_path}.jpg`}
                                        />
                                    </div>
                                    <p className="home-new-title">{item.title}</p>
                                    <p className="home-review-title">Reviewer: {item.name} </p>
                                    <p className="home-review-title">Post date: {formatDate(item.createdAt)} </p>
                                </div>
                            ))}
                        </div>
                        <h4>Liked</h4>
                        <div className="pro5-like">
                            <div className="first-post"></div>
                            {/* <p>Post title</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Profile;
