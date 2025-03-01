import React, { useContext, useEffect, useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';

function Posts() {
    const [state] = useContext(StateContext);
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);

    // Lấy danh sách bài viết từ API
    useEffect(() => {
        instance
            .post('/get-review-by-user-id', { user_id: state.userData.userId })
            .then((res) => setPosts(res.data))
            .catch((err) => console.error('Error fetching posts:', err));
    }, [state.userData.userId]);

    // Hàm xử lý tìm kiếm bài viết
    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

    // Hàm xử lý xóa bài viết
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await instance.delete(`/delete-review/${id}`);
                setPosts(posts.filter((post) => post.review_id !== id));
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    // Mở form chỉnh sửa với dữ liệu hiện tại
    const handleEdit = (post) => {
        setEditData(post);
        setOpenEdit(true);
    };

    // Cập nhật dữ liệu khi nhập vào form
    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    // Xử lý cập nhật bài viết
    const handleUpdate = async () => {
        try {
            await instance.put(`/update-review/${editData.review_id}`, editData);
            setPosts(posts.map((post) => (post.review_id === editData.review_id ? editData : post)));
            setOpenEdit(false);
            alert('Post updated successfully!');
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <Box>
            <SubHeader />
            <Box display="flex">
                <ReviewSidebar />
                <Box flex={1} p={3}>
                    <h3>Manage your posts</h3>

                    {/* Search Bar */}
                    <Box display="flex" alignItems="center" mb={2}>
                        <TextField
                            label="Search post..."
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </Box>

                    {/* Table */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Action</TableCell>
                                    <TableCell>Post Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredPosts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} align="center">
                                            No posts found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredPosts.map((post) => (
                                        <TableRow key={post.review_id}>
                                            <TableCell>
                                                <img
                                                    src={`https://res.cloudinary.com/dppaihihm/image/upload/${post.img_path}.jpg`}
                                                    alt={post.title}
                                                    width="80"
                                                    height="80"
                                                    style={{ borderRadius: '8px' }}
                                                />
                                            </TableCell>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell>
                                                <IconButton color="primary" onClick={() => handleEdit(post)}>
                                                    <MdEdit size={24} />
                                                </IconButton>
                                                <IconButton color="error" onClick={() => handleDelete(post.review_id)}>
                                                    <MdDeleteOutline size={24} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            {/* Dialog Edit Form */}
            <Dialog aria-hidden={!openEdit} open={openEdit} onClose={() => setOpenEdit(false)} fullWidth>
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Title"
                        fullWidth
                        name="title"
                        value={editData?.title || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Introduction"
                        fullWidth
                        name="introduction"
                        value={editData?.introduction || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Packaging"
                        fullWidth
                        name="packaging"
                        value={editData?.packaging || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Ingredients"
                        fullWidth
                        name="ingredients"
                        value={editData?.ingredients || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Review"
                        fullWidth
                        name="review"
                        value={editData?.review || ''}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenEdit(false)} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary">
                        Update
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default Posts;
