import React, { useContext, useEffect, useRef, useState } from 'react';
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
    FormControl,
    Select,
    MenuItem,
    Typography,
} from '@mui/material';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { CgAsterisk } from 'react-icons/cg';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';

// Cloudinary Upload Widget Component
const CloudinaryUploadWidget = ({ uwConfig, setPublicId, disabled }) => {
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
                            setPublicId(result.info.public_id);
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
    }, [uwConfig, setPublicId]);

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

function ManageProduct() {
    const [state] = useContext(StateContext);
    const [posts, setPosts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newImageId, setNewImageId] = useState(null);

    // Fetch posts and ingredients
    useEffect(() => {
        instance
            .post('/get-review-by-user-id', { user_id: state.userData.userId })
            .then((res) => setPosts(res.data))
            .catch((err) => console.error('Error fetching posts:', err));

        instance
            .get('/get-all-ingredients')
            .then((res) => setIngredients(res.data))
            .catch((err) => console.error('Error fetching ingredients:', err));
    }, [state.userData.userId]);

    const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()));

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

    const handleEdit = (post) => {
        setEditData(post);
        setNewImageId(null); // Reset new image when opening edit
        setOpenEdit(true);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setIsSubmitting(true);
        try {
            const updatedData = {
                ...editData,
                ...(newImageId && { img_path: newImageId }),
            };

            await instance.put(`/update-review/${editData.review_id}`, updatedData);
            setPosts(posts.map((post) => (post.review_id === editData.review_id ? updatedData : post)));
            setOpenEdit(false);
            setNewImageId(null);
            alert('Post updated successfully!');
        } catch (error) {
            console.error('Error updating post:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const requiredFields = [
        'title',
        'introduction',
        'packaging',
        'uses',
        'target_user',
        'review',
        'pros',
        'cons',
        'guide',
        'conclusion',
        'ingredients',
    ];

    return (
        <Box>
            <SubHeader />
            <Box display="flex">
                <ReviewSidebar />
                <Box flex={1} p={3}>
                    <h3>Manage products</h3>

                    {/* Search Bar */}
                    <Box display="flex" alignItems="center" mb={2}>
                        <TextField
                            label="Search post..."
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                endAdornment: <IoIosSearch />,
                            }}
                        />
                    </Box>

                    {/* Posts Table */}
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
                                                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                                                />
                                            </TableCell>
                                            <TableCell>{post.title}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(post)}
                                                    disabled={isSubmitting}
                                                >
                                                    <MdEdit size={24} />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(post.review_id)}
                                                    disabled={isSubmitting}
                                                >
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

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="md">
                <DialogTitle>Edit Post</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        {requiredFields
                            .filter((field) => field !== 'ingredients')
                            .map((field) => (
                                <Box key={field} sx={{ mb: 3 }}>
                                    <Box display="flex" alignItems="center" mb={1}>
                                        <CgAsterisk style={{ color: 'red', marginRight: 8 }} />
                                        <Typography variant="subtitle1">
                                            {field.charAt(0).toUpperCase() + field.slice(1)}
                                        </Typography>
                                    </Box>
                                    <TextField
                                        fullWidth
                                        multiline
                                        rows={4}
                                        name={field}
                                        value={editData?.[field] || ''}
                                        onChange={handleEditChange}
                                        disabled={isSubmitting}
                                    />
                                </Box>
                            ))}

                        <Box sx={{ mb: 3 }}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <CgAsterisk style={{ color: 'red', marginRight: 8 }} />
                                <Typography variant="subtitle1">Ingredients</Typography>
                            </Box>
                            <FormControl fullWidth>
                                <Select
                                    name="ingredients"
                                    value={editData?.ingredients || ''}
                                    onChange={handleEditChange}
                                    disabled={isSubmitting}
                                >
                                    <MenuItem value="" disabled>
                                        Select an ingredient
                                    </MenuItem>
                                    {ingredients.map((ingredient) => (
                                        <MenuItem key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                                            {ingredient.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Box display="flex" alignItems="center" mb={1}>
                                <CgAsterisk style={{ color: 'red', marginRight: 8 }} />
                                <Typography variant="subtitle1">Image</Typography>
                            </Box>

                            {/* Current Image */}
                            {editData?.img_path && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Current Image:
                                    </Typography>
                                    <img
                                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${editData.img_path}.jpg`}
                                        alt="Current"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '200px',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Cloudinary Upload Widget */}
                            <CloudinaryUploadWidget
                                uwConfig={{
                                    cloudName: 'dppaihihm',
                                    uploadPreset: 'Beauty Web',
                                }}
                                setPublicId={setNewImageId}
                                disabled={isSubmitting}
                            />

                            {/* New Image Preview */}
                            {newImageId && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        New Image Preview:
                                    </Typography>
                                    <img
                                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${newImageId}.jpg`}
                                        alt="New Preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '200px',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenEdit(false);
                            setNewImageId(null);
                        }}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleUpdate} color="primary" variant="contained" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Update Post'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default  ManageProduct;
