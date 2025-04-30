import React, { useState } from "react";
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
  Chip,
  Paper,
  Menu,
  MenuItem,
  IconButton
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CreateIcon from "@mui/icons-material/Create";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ReplyIcon from "@mui/icons-material/Reply";

function Community() {
  // State quản lý filter
  const [activeFilter, setActiveFilter] = useState("latest");
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Data mẫu
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "BeautyExpert",
      title: "Best skincare routine for summer",
      content: "Here are my top recommendations...",
      comments: [
        { 
          id: 1,
          user: "User1", 
          text: "Great tips!", 
          replies: [
            { id: 1, user: "BeautyExpert", text: "Thanks!" }
          ] 
        },
        { 
          id: 2,
          user: "User2", 
          text: "What about for oily skin?",
          replies: [] 
        }
      ],
      likes: 24,
      isLiked: false,
      date: "2025-04-28",
      isPopular: true
    },
    {
      id: 2,
      user: "MakeupLover",
      title: "New foundation review",
      content: "Just tried this new product...",
      comments: [
        { 
          id: 3,
          user: "User3", 
          text: "How's the coverage?",
          replies: [] 
        }
      ],
      likes: 15,
      isLiked: false,
      date: "2025-04-30",
      isNew: true
    }
  ]);

  const topCreators = [
    { id: 1, name: "BeautyGuru", posts: 42, avatar: "B" },
    { id: 2, name: "SkinCareExpert", posts: 38, avatar: "S" },
    { id: 3, name: "MakeupArtist", posts: 29, avatar: "M" }
  ];

  // Xử lý mở/đóng menu filter
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorEl(null);
  };

  // Xử lý chọn filter
  const handleFilterSelect = (filter) => {
    setActiveFilter(filter);
    handleFilterClose();
  };

  // Xử lý like bài viết
  const handleLikePost = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  // Lọc bài đăng theo các tiêu chí
  const filteredPosts = posts.filter(post => {
    // Lọc theo search query
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Lọc theo loại
    switch (activeFilter) {
      case "newest":
        return post.isNew;
      case "popular":
        return post.isPopular;
      default:
        return true;
    }
  });

  // Lấy label cho filter hiện tại
  const getFilterLabel = () => {
    switch (activeFilter) {
      case "latest":
        return "Latest";
      case "newest":
        return "Newest";
      case "popular":
        return "Popular";
      default:
        return "Filter";
    }
  };

  return (
    <Box sx={{ p: 4, color: '#3C4B57' }}>
      <Grid container spacing={4}>
        {/* Cột trái - Tạo bài đăng và Top Creators */}
        <Grid item xs={12} md={3}>
          <Paper elevation={3} sx={{ p: 3, mb: 4, position: 'sticky', top: 20 }}>
            <Button
              fullWidth
              variant="contained"
              size="large"
              startIcon={<CreateIcon />}
              sx={{ 
                mb: 3,
                backgroundColor: '#DFB5B5',
                '&:hover': {
                  backgroundColor: '#d8a5a5',
                }
              }}
            >
              Create New Post
            </Button>
            
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              Top Creators
            </Typography>
            
            <Stack spacing={2}>
              {topCreators.map(creator => (
                <Card key={creator.id} variant="outlined">
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {creator.avatar}
                      </Avatar>
                    }
                    title={creator.name}
                    subheader={`${creator.posts} posts`}
                  />
                </Card>
              ))}
            </Stack>
          </Paper>
        </Grid>

        {/* Cột phải - Nội dung chính */}
        <Grid item xs={12} md={9}>
          <Paper elevation={3} sx={{ p: 3 }}>
            {/* Header */}
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
              Beauty Community
            </Typography>
            
            <Typography variant="body1" sx={{ mb: 3 }}>
              Welcome to our beauty community! Share your tips, ask questions, 
              and connect with other beauty enthusiasts.
            </Typography>
            
            {/* Thanh tìm kiếm */}
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
            
            {/* Phần Filter - Phiên bản dropdown */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2, 
              mb: 3
            }}>
              <Button
                variant="outlined"
                startIcon={<FilterAltIcon />}
                endIcon={<ArrowDropDownIcon />}
                onClick={handleFilterClick}
                sx={{ textTransform: 'none' }}
              >
                {getFilterLabel()}
              </Button>
              
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleFilterClose}
              >
                <MenuItem onClick={() => handleFilterSelect("latest")}>Latest</MenuItem>
                <MenuItem onClick={() => handleFilterSelect("newest")}>Newest</MenuItem>
                <MenuItem onClick={() => handleFilterSelect("popular")}>Popular</MenuItem>
              </Menu>
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {/* Danh sách bài đăng */}
            <Stack spacing={3}>
              {filteredPosts.length > 0 ? (
                filteredPosts.map(post => (
                  <Card key={post.id} elevation={2}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: 'secondary.main' }}>
                          {post.user.charAt(0)}
                        </Avatar>
                      }
                      title={post.user}
                      subheader={post.title}
                    />
                    
                    <CardContent>
                      <Typography variant="body1" paragraph>
                        {post.content}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: 2,
                        mt: 2
                      }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <IconButton onClick={() => handleLikePost(post.id)}>
                            {post.isLiked ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
                          </IconButton>
                          <Typography variant="body2">
                            {post.likes}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <ChatBubbleOutlineIcon fontSize="small" />
                          <Typography variant="body2">
                            {post.comments.length}
                          </Typography>
                        </Box>
                        
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ ml: 'auto' }}
                        >
                          {post.date}
                        </Typography>
                      </Box>
                    </CardContent>
                    
                    {/* Phần bình luận */}
                    {post.comments.length > 0 && (
                      <Box sx={{ 
                        bgcolor: 'action.hover', 
                        p: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider'
                      }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Comments ({post.comments.length})
                        </Typography>
                        
                        <Stack spacing={2}>
                          {post.comments.map((comment) => (
                            <Box key={comment.id}>
                              <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                <Avatar sx={{ 
                                  width: 24, 
                                  height: 24, 
                                  fontSize: 12,
                                  bgcolor: 'primary.light'
                                }}>
                                  {comment.user.charAt(0)}
                                </Avatar>
                                <Typography variant="body2">
                                  <strong>{comment.user}:</strong> {comment.text}
                                </Typography>
                              </Box>
                              
                              {/* Reply button */}
                              <Box sx={{ display: 'flex', alignItems: 'center', ml: 5 }}>
                                <IconButton size="small" sx={{ mr: 1 }}>
                                  <ReplyIcon fontSize="small" />
                                </IconButton>
                                <Typography variant="caption" color="text.secondary">
                                  Reply
                                </Typography>
                              </Box>
                              
                              {/* Replies */}
                              {comment.replies.length > 0 && (
                                <Box sx={{ ml: 5, mt: 1 }}>
                                  {comment.replies.map(reply => (
                                    <Box key={reply.id} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                      <Avatar sx={{ 
                                        width: 24, 
                                        height: 24, 
                                        fontSize: 12,
                                        bgcolor: 'secondary.light'
                                      }}>
                                        {reply.user.charAt(0)}
                                      </Avatar>
                                      <Typography variant="body2">
                                        <strong>{reply.user}:</strong> {reply.text}
                                      </Typography>
                                    </Box>
                                  ))}
                                </Box>
                              )}
                            </Box>
                          ))}
                        </Stack>
                      </Box>
                    )}
                  </Card>
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
  );
}

export default Community;