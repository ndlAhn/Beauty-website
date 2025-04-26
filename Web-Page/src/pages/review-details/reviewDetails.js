import './reviewDetails.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FaRegClock } from 'react-icons/fa';
import { BsReply } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import instance from '../../axios/instance';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Paper,
    Typography,
    Collapse,
    IconButton,
} from '@mui/material';
import { Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';

function ReviewDetails() {

    const [isFavorite, setIsFavorite] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [reviewData, setReviewData] = useState(null);
    const { reviewId } = useParams();
    const cloudName = 'dppaihihm';
    const [openToc, setOpenToc] = useState(true);
    const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);
  };

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

    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([
                ...comments,
                { id: Date.now(), text: newComment, parentId: null, replies: [], likes: 0, dislikes: 0 },
            ]);
            setNewComment('');
        }
    };

    const handleReply = (parentId, text) => {
        const addReply = (comments) =>
            comments.map((c) => {
                if (c.id === parentId) {
                    return {
                        ...c,
                        replies: [
                            ...(c.replies || []),
                            { id: Date.now(), text, parentId, replies: [], likes: 0, dislikes: 0 },
                        ],
                    };
                } else if (c.replies) {
                    return { ...c, replies: addReply(c.replies) };
                }
                return c;
            });
        setComments(addReply(comments));
    };

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

    const CommentItem = ({ comment }) => {
        const [showReplyBox, setShowReplyBox] = useState(false);
        const [replyText, setReplyText] = useState('');

        const handleReplySubmit = () => {
            if (replyText.trim()) {
                handleReply(comment.id, replyText);
                setReplyText('');
                setShowReplyBox(false);
            }
        };

        return (
            <div className="review-details-user-comment" style={{ marginLeft: comment.parentId ? '20px' : '0' }}>
                <div className="comment-header">
                    <p className="user-comment">User's name</p>
                    <div className="comment-history-section">
                        <div className="comment-history">
                            <FaRegClock className="clock-icon" />
                        </div>
                        <p>{new Date(comment.id).toLocaleDateString('en-GB')}</p>
                    </div>
                </div>
                <div className="user-comment-script">
                    <p>{comment.text}</p>
                </div>
                <div className="reply-comment-section" onClick={() => setShowReplyBox(!showReplyBox)}>
                    <div className="comment-history">
                        <BsReply className="reply-icon" />
                    </div>
                    <p>Reply</p>
                </div>
                {showReplyBox && (
                    <div className="reply-box">
                        <textarea
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="Write a reply..."
                        />
                        <button onClick={handleReplySubmit}>Post Reply</button>
                    </div>
                )}
                {/* Hiển thị các reply nếu có */}
                {comment.replies && comment.replies.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} />
                ))}
            </div>
        );
    };

    if (!reviewData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header />
            <div className="review-details-wrap">
                <div className="review-details-content-wrap">
                    {/* <div className="review-details-title">
                        <h3>{reviewData.title}</h3>
                    </div> */}
                                    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      width: '100%'
    }}>
      <div className="review-details-title" style={{ textAlign: 'center' }}>
        <h3 style={{ margin: 0 }}>{reviewData.title}</h3>
      </div>
      
      <IconButton 
        aria-label="add to favorites"
        onClick={handleFavoriteClick}
        size="medium"
        sx={{ 
          position: 'absolute',
          right: 0,
          '&:hover': {
            backgroundColor: 'transparent'
          }
        }}
      >
        {isFavorite ? (
          <FavoriteIcon color="error" fontSize="large" />
        ) : (
          <FavoriteBorderIcon fontSize="large" />
        )}
      </IconButton>
    </div>

                    <h5>Introduction</h5>
                    <div className="review-script">
                        <p>{reviewData.introduction}</p>
                    </div>

                    {/* Table of Contents */}
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
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' }
                            }}
                        >
                            <MenuIcon sx={{ mr: 1 }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                                Table of Contents
                            </Typography>
                            {openToc ? <ExpandLess sx={{ ml: 'auto' }} /> : <ExpandMore sx={{ ml: 'auto' }} />}
                        </IconButton>

                        <Collapse in={openToc}>
                            <List sx={{ py: 0 }}>
                                {TABLE_OF_CONTENTS.map((item) => (
                                    <ListItem key={item.id} disablePadding>
                                        <ListItemButton onClick={() => handleTocClick(item.id)} sx={{ px: 4, py: 1.5 }}>
                                            <ListItemText primary={item.label} primaryTypographyProps={{ fontWeight: 'large' }} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>

                    {/* Main content */}
                    {reviewData.img_path && (
                        <img
                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${reviewData.img_path}.jpg`}
                            alt="Product"
                            className="review-product-image"
                        />
                    )}
                    
                    {/* Các phần nội dung khác (packaging, uses, target user...) */}
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
                                <p>Pros</p>
                                <div className="review-script">
                                    <div className="pros-script">{reviewData.pros}</div>
                                </div>
                            </div>
                            <div className="review-details-cons">
                                <p>Cons</p>
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

                    {/* Comment Section */}
                    <div className="review-details-comment">
                        <h5>Comments</h5>
                        <div className="review-details-comment-area">
                            <textarea
                                className="comment"
                                placeholder="Add your comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                        </div>
                        <div className="review-details-comment-upload-btn">
                            <button className="upload-comment-btn" onClick={handleAddComment}>Post comment</button>
                        </div>

                        {/* Hiển thị comment */}
                        {comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
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
