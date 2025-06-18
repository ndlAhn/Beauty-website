// manageReview.js (enhanced)
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
    Typography,
    CircularProgress,
} from '@mui/material';
import { MdDeleteOutline, MdEdit } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { CgAsterisk } from 'react-icons/cg';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import CloudinaryUploadWidget from '../../../components/cloudinaryUploadWidget/cloudinaryUploadWidget';

function ManageReview() {
    const cloudName = 'dppaihihm';
    const [state] = useContext(StateContext);
    const [reviews, setReviews] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newImageId, setNewImageId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        setIsLoading(true);
        try {
            const res = await instance.post('/get-review-by-user-id', { user_id: state.userData.user_id });
            setReviews(res.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredReviews = reviews.filter((review) =>
        review.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this review?')) {
            try {
                await instance.delete(`/delete-review/${id}`);
                setReviews(reviews.filter((review) => review.review_id !== id));
            } catch (error) {
                console.error('Error deleting review:', error);
            }
        }
    };

    const handleEdit = (review) => {
        setEditData(review);
        setNewImageId(null);
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
            setReviews(reviews.map((review) => 
                review.review_id === editData.review_id ? updatedData : review
            ));
            setOpenEdit(false);
            setNewImageId(null);
            alert('Review updated successfully!');
        } catch (error) {
            console.error('Error updating review:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const reviewFields = [
        'title',
        'introduction',
        'packaging',
        'uses',
        'targetUser',
        'review',
        'pros',
        'cons',
        'guide',
        'conclusion',
    ];

    return (
        <Box>
            <SubHeader />
            <Box display="flex">
                <ReviewSidebar />
                <Box flex={1} p={3}>
                    <Typography variant="h4" sx={{ color: '#3c4b57', mb: 2 }}>
                        MANAGE REVIEWS
                    </Typography>

                    {/* Search Bar */}
                    <Box display="flex" alignItems="center" mb={2}>
                        <TextField
                            label="Search reviews..."
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                endAdornment: <IoIosSearch />,
                            }}
                        />
                    </Box>

                    {/* Reviews Table */}
                    {isLoading ? (
                        <Box display="flex" justifyContent="center" py={4}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Action</TableCell>
                                        <TableCell>Post Date</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredReviews.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} align="center">
                                                No reviews found.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredReviews.map((review) => (
                                            <TableRow key={review.review_id}>
                                                <TableCell>
                                                    <img
                                                        src={`https://res.cloudinary.com/${cloudName}/image/upload/${review.img_path}.jpg`}
                                                        alt={review.title}
                                                        width="50"
                                                        height="50"
                                                        style={{ borderRadius: '4px', objectFit: 'cover' }}
                                                    />
                                                </TableCell>
                                                <TableCell>{review.title}</TableCell>
                                                <TableCell>
                                                    {review.type_review === 'post' ? 'Post' : 'Review'}
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        color="primary"
                                                        onClick={() => handleEdit(review)}
                                                        disabled={isSubmitting}
                                                    >
                                                        <MdEdit size={24} />
                                                    </IconButton>
                                                    <IconButton
                                                        color="error"
                                                        onClick={() => handleDelete(review.review_id)}
                                                        disabled={isSubmitting}
                                                    >
                                                        <MdDeleteOutline size={24} />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    {new Date(review.createdAt).toLocaleDateString()}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Box>
            </Box>

            {/* Edit Dialog */}
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} fullWidth maxWidth="md">
                <DialogTitle>Edit Review</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        {reviewFields.map((field) => (
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

                        {/* Image Upload */}
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
                                        src={`https://res.cloudinary.com/${cloudName}/image/upload/${editData.img_path}.jpg`}
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
                                    cloudName,
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
                                        src={`https://res.cloudinary.com/${cloudName}/image/upload/${newImageId}.jpg`}
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
                        {isSubmitting ? 'Updating...' : 'Update Review'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManageReview;