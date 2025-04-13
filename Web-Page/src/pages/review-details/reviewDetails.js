import './reviewDetails.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FaRegClock } from 'react-icons/fa';
import { BsReply } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../axios/instance';
import {
    Box, // Giữ lại import Box ở đây
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
    Divider,
    Collapse,
    IconButton,
    // Bỏ các import trùng lặp ở dưới
} from '@mui/material';
import { Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { Circle, LabelImportant } from '@mui/icons-material';

function ReviewDetails() {
    const [reviewData, setReviewData] = useState(null);
    const { reviewId } = useParams();
    const cloudName = 'dppaihihm';
    const [openToc, setOpenToc] = useState(true); // Mở/đóng mục lục

    // Danh sách mục lục có thể tùy chỉnh
    const TABLE_OF_CONTENTS = [
        { id: 'packaging', label: 'Packaging' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'uses', label: 'Uses' },
        { id: 'target-user', label: 'Target User' },
        { id: 'review', label: 'Review' },
        { id: 'pros-cons', label: 'Pros & Cons' },
        { id: 'guide', label: 'User Guidelines' },
        { id: 'conclusion', label: 'Conclusion' },
    ];

    useEffect(() => {
        const fetchReviewDetails = async () => {
            try {
                const response = await instance.get(`/get-review/${reviewId}`);
                setReviewData(response.data);
            } catch (error) {
                console.error('Error fetching review details:', error);
            }
        };

        if (reviewId) {
            fetchReviewDetails();
        }
    }, [reviewId]);

    if (!reviewData) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB');
    };

    const handleTocClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div>
            <Header />
            <div className="review-details-wrap">
                <div className="review-details-content-wrap">
                    <div className="review-details-title">
                        <h3>{reviewData.title}</h3>
                    </div>

                    <h5>Introduction</h5>
                    <div className="review-script">
                        <p>{reviewData.introduction}</p>
                    </div>

                    {/* Mục lục được thiết kế lại với MUI */}
                    <Box sx={{ 
                        position: 'relative',
                        mb: 4,
                        backgroundColor: 'rgb(223,181,182)',
                        borderRadius: '8px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                        maxWidth: '400px'

                    }}>
                        <IconButton
                            onClick={() => setOpenToc(!openToc)}
                            sx={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                py: 2,
                                px: 3,
                                color: 'rgb(60,75,87)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.2)'
                                }
                            }}
                        >
                            <MenuIcon sx={{ mr: 1,  }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                Table of Contents
                            </Typography>
                            {openToc ? (
                                <ExpandLess sx={{ ml: 'auto' }} />
                            ) : (
                                <ExpandMore sx={{ ml: 'auto' }} />
                            )}
                        </IconButton>

                        <Collapse in={openToc}>
                            <List sx={{ 
                                py: 0,
                                '& .MuiListItem-root': {
                                    px: 0
                                }
                            }}>
                                {TABLE_OF_CONTENTS.map((item) => (
                                    <ListItem 
                                        key={item.id}
                                        disablePadding
                                    >
                                        <ListItemButton 
                                            onClick={() => handleTocClick(item.id)}
                                            sx={{
                                                px: 4,
                                                py: 1.5,
                                                color: 'rgb(60,75,87)',
                                                '&:hover': {
                                                    backgroundColor: 'rgba(255,255,255,0.2)'
                                                }
                                            }}
                                        >
                                            <ListItemText 
                                                primary={item.label} 
                                                primaryTypographyProps={{
                                                    fontWeight: 'medium'
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>

                    {/* Giữ nguyên các phần nội dung hiện có */}
                    {reviewData.img_path && (
                        <img
                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${reviewData.img_path}.jpg`}
                            alt="Product"
                            className="review-product-image"
                        />
                    )}

                    <div id="packaging" className="element-review-details">
                        <h5>1. Packaging:</h5>
                        <div className="review-script">
                            <p>{reviewData.packaging}</p>
                        </div>
                    </div>
                    <div id="uses" className="element-review-details">
                        <h5>3. Uses:</h5>
                        <div className="review-script">
                            <p>{reviewData.uses}</p>
                        </div>
                    </div>

                    <div id="target-user" className="element-review-details">
                        <h5>4. Target user:</h5>
                        <div className="review-script">
                            <p>{reviewData.target_user}</p>
                        </div>
                    </div>

                    <div id="review" className="element-review-details">
                        <h5>5. Review:</h5>
                        <div className="review-script">
                            <p>{reviewData.review}</p>
                        </div>
                    </div>

                    <div id="pros-cons" className="element-review-details">
                        <h5>6. Pros & Cons:</h5>
                        <div className="review-details-pros-cons-wrap">
                            <div className="review-details-pros">
                                <div className="review-details-title">
                                    <p>Pros</p>
                                </div>
                                <div className="review-script">
                                    <div className="pros-script">{reviewData.pros}</div>
                                </div>
                            </div>
                            <div className="review-details-cons">
                                <div className="review-details-title">
                                    <p>Cons</p>
                                </div>
                                <div className="review-script">
                                    <div className="cons-script">{reviewData.cons}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="guide" className="element-review-details">
                        <h5>7. User Guidelines:</h5>
                        <div className="review-script">
                            <p>{reviewData.guide}</p>
                        </div>
                    </div>

                    <div id="conclusion" className="element-review-details">
                        <h5>Conclusion</h5>
                        <div className="review-script">
                            <p>{reviewData.conclusion}</p>
                        </div>
                    </div>

                    <div className="custom-line"></div>

                    <div className="review-detais-reviewer">
                        <h6>REVIEW BY:</h6>
                        <h6 className="review-detais-reviewer-name">{reviewData.user?.name || 'Unknown'}</h6>
                        <h6>UPDATED:</h6>
                        <h6>{formatDate(reviewData.updatedAt)}</h6>
                    </div>

                    <div className="review-details-comment">
                        <h5>Comments</h5>
                        <div className="review-details-comment-area">
                            <textarea
                                type="text"
                                className="comment"
                                id="comment"
                                name="comment"
                                placeholder="Add your comment..."
                            />
                        </div>
                        <div className="review-details-comment-upload-btn">
                            <button className="upload-comment-btn">Post comment</button>
                        </div>

                        <div className="review-details-user-comment">
                            <div className="comment-header">
                                <p className="user-comment">User's name</p>
                                <div className="comment-history-section">
                                    <div className="comment-history">
                                        <FaRegClock className="clock-icon" />
                                    </div>
                                    <p>22/5/2002</p>
                                </div>
                            </div>
                            <div className="user-comment-script">
                                <p>User's comment</p>
                            </div>
                            <div className="reply-comment-section">
                                <div className="comment-history">
                                    <BsReply className="reply-icon" />
                                </div>
                                <p>Reply</p>
                            </div>
                        </div>
                    </div>

                    <div className="admin-delete-post">
                        <button className="delete-review-btn">Delete review</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ReviewDetails;
