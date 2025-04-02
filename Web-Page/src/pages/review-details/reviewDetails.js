import './reviewDetails.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FaRegClock } from 'react-icons/fa';
import { BsReply } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../axios/instance';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
    Divider,
    Collapse,
    IconButton,
} from '@mui/material';
import { ExpandLess, ExpandMore, Circle, LabelImportant } from '@mui/icons-material';

function ReviewDetails() {
    const [reviewData, setReviewData] = useState(null);
    const { reviewId } = useParams();
    const cloudName = 'dppaihihm';
    const [openToc, setOpenToc] = useState(true); // Mở/đóng mục lục

    // Danh sách mục lục có thể tùy chỉnh
    const TABLE_OF_CONTENTS = [
        { id: 'packaging', label: 'Packaging', icon: <Circle fontSize="small" /> },
        { id: 'ingredients', label: 'Ingredients', icon: <Circle fontSize="small" /> },
        { id: 'uses', label: 'Uses', icon: <Circle fontSize="small" /> },
        { id: 'target-user', label: 'Target User', icon: <Circle fontSize="small" /> },
        { id: 'review', label: 'Review', icon: <LabelImportant fontSize="small" color="primary" /> },
        { id: 'pros-cons', label: 'Pros & Cons', icon: <LabelImportant fontSize="small" color="primary" /> },
        { id: 'guide', label: 'User Guidelines', icon: <Circle fontSize="small" /> },
        { id: 'conclusion', label: 'Conclusion', icon: <LabelImportant fontSize="small" color="secondary" /> },
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
                    <Paper elevation={3} sx={{ mb: 3, borderRadius: 2 }}>
                        <ListItemButton onClick={() => setOpenToc(!openToc)}>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Table of Contents
                                    </Typography>
                                }
                            />
                            {openToc ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Divider />

                        <Collapse in={openToc} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                {TABLE_OF_CONTENTS.map((item) => (
                                    <ListItem
                                        key={item.id}
                                        disablePadding
                                        sx={{
                                            '&:hover': {
                                                backgroundColor: 'action.hover',
                                            },
                                        }}
                                    >
                                        <ListItemButton onClick={() => handleTocClick(item.id)} sx={{ pl: 4 }}>
                                            <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
                                            <ListItemText
                                                primary={<Typography variant="body1">{item.label}</Typography>}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Paper>

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
