import React, { useContext, useState } from 'react';
import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Button,
    Stack,
    Paper,
    Menu,
    MenuItem,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyIcon from '@mui/icons-material/Reply';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import instance from '../../axios/instance.js';
import StateContext from '../../context/context.context.js';
import CreatePost from '../../components/community/CreatePost';
import CommunityPost from '../../components/community/CommunityPost';

function Community() {
    // State for posts and filters
    const [activeFilter, setActiveFilter] = useState('latest');
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [openPostDialog, setOpenPostDialog] = useState(false);
    const [state] = useContext(StateContext);
    const [posts, setPosts] = useState([]);

    // Fetch posts from backend
    const fetchPosts = async () => {
        const token = localStorage.getItem('token');
        const res = await instance.get('/community/posts', { headers: { Authorization: `Bearer ${token}` } });
        setPosts(res.data);
    };

    React.useEffect(() => {
        fetchPosts();
    }, []);

    // Filter menu handlers
    const handleFilterClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleFilterClose = () => {
        setAnchorEl(null);
    };

    const handleFilterSelect = (filter) => {
        setActiveFilter(filter);
        handleFilterClose();
    };

    // Post like handler
    const handleLikePost = (postId) => {
        setPosts(
            posts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
                        isLiked: !post.isLiked,
                    };
                }
                return post;
            }),
        );
    };

    // Post dialog handlers
    const handleOpenPostDialog = () => {
        setOpenPostDialog(true);
    };

    const handleClosePostDialog = () => {
        setOpenPostDialog(false);
    };

    // Filter posts based on search and active filter
    const filteredPosts = posts.filter((post) => {
        if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
            return false;
        }

        switch (activeFilter) {
            case 'newest':
                return post.isNew;
            case 'popular':
                return post.isPopular;
            default:
                return true;
        }
    });

    const getFilterLabel = () => {
        switch (activeFilter) {
            case 'latest':
                return 'Latest';
            case 'newest':
                return 'Newest';
            case 'popular':
                return 'Popular';
            default:
                return 'Filter';
        }
    };

    return (
        <Box sx={{ color: '#3C4B57' }}>
            <Header />
            <Box sx={{ p: 4 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={3}>
                        <Paper elevation={3} sx={{ p: 3, mb: 4, position: 'sticky', top: 20 }}>
                            <Button
                                fullWidth
                                variant="contained"
                                size="medium"
                                startIcon={<CreateIcon />}
                                sx={{
                                    mb: 3,
                                    backgroundColor: '#DFB5B5',
                                    color: '#3C4B57',
                                    '&:hover': {
                                        backgroundColor: '#d8a5a5',
                                    },
                                }}
                                onClick={() => setOpenPostDialog(true)}
                            >
                                Create New Post
                            </Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={9}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                                Beauty Community
                            </Typography>
                            <Typography variant="body1" sx={{ mb: 3 }}>
                                Welcome to beauty community! Ask our experts anything about beauty, lifestyle, or daily
                                life. We're here to help—drop your questions below!
                            </Typography>
                            <TextField
                                fullWidth
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                sx={{ mb: 3 }}
                            />
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                                <Button
                                    variant="outlined"
                                    startIcon={<FilterAltIcon />}
                                    endIcon={<ArrowDropDownIcon />}
                                    onClick={handleFilterClick}
                                    sx={{
                                        textTransform: 'none',
                                        color: '#3C4B57',
                                        borderColor: '#3C4B57',
                                        '&:hover': {
                                            borderColor: '#3C4B57',
                                            backgroundColor: 'rgba(60, 75, 87, 0.04)',
                                        },
                                    }}
                                >
                                    {getFilterLabel()}
                                </Button>

                                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleFilterClose}>
                                    <MenuItem onClick={() => handleFilterSelect('latest')}>Latest</MenuItem>
                                    <MenuItem onClick={() => handleFilterSelect('newest')}>Newest</MenuItem>
                                    <MenuItem onClick={() => handleFilterSelect('popular')}>Popular</MenuItem>
                                </Menu>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Stack spacing={3}>
                                {posts.length > 0 ? (
                                    posts.map((post) => (
                                        <CommunityPost key={post.post_id} post={post} onAction={fetchPosts} />
                                    ))
                                ) : (
                                    <Typography variant="body1" color="text.secondary" textAlign="center" py={4}>
                                        No posts found matching your criteria
                                    </Typography>
                                )}
                            </Stack>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            {/* Create Post Dialog */}
            <Dialog open={openPostDialog} onClose={() => setOpenPostDialog(false)} maxWidth="md" fullWidth>
                <DialogTitle>Create new post</DialogTitle>
                <DialogContent>
                    <CreatePost
                        onPostCreated={() => {
                            setOpenPostDialog(false);
                            fetchPosts();
                        }}
                    />
                </DialogContent>
            </Dialog>

            <Footer />
        </Box>
    );
}

export default Community;
