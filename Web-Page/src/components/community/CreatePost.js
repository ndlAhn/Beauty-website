import React, { useState } from 'react';
import instance from '../../axios/instance';
import CloudinaryUploadWidget from '../cloudinaryUploadWidget/cloudinaryUploadWidget';
import { Box, TextField, Button, Card, CardContent, Stack, Typography } from '@mui/material';

function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState('');
    const [imageId, setImageId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const token = localStorage.getItem('token');
        await instance.post(
            '/community/posts',
            { content, picture: imageId },
            { headers: { Authorization: `Bearer ${token}` } },
        );
        setContent('');
        setImageId(null);
        setIsSubmitting(false);
        onPostCreated();
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2}>
                        <Typography variant="h6">Create a Post</Typography>
                        <TextField
                            multiline
                            minRows={3}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="What's on your mind?"
                            fullWidth
                            required
                        />
                        <CloudinaryUploadWidget
                            uwConfig={{
                                cloudName: 'dppaihihm',
                                uploadPreset: 'Beauty Web',
                            }}
                            setPublicId={setImageId}
                        />
                        {imageId && (
                            <Box sx={{ mt: 1, mb: 1 }}>
                                <img
                                    src={`https://res.cloudinary.com/dppaihihm/image/upload/${imageId}.jpg`}
                                    alt="Preview"
                                    style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                                />
                            </Box>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isSubmitting || !content.trim()}
                        >
                            {isSubmitting ? 'Posting...' : 'Post'}
                        </Button>
                    </Stack>
                </form>
            </CardContent>
        </Card>
    );
}

export default CreatePost;
