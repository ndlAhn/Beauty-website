import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Button,
    CircularProgress,
    Chip,
    IconButton,
    Rating,
    Dialog,
    DialogTitle,
    DialogContent,
} from '@mui/material';
import { FaRegHeart, FaExternalLinkAlt, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import ChatBox from '../../components/chatBox/chatBox.js';
import Slogan from '../../pages/home/slogan.png';
import instance from '../../axios/instance.js';
import './homepage.css';

function Homepage() {
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [beautyNews, setBeautyNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [openNewsDialog, setOpenNewsDialog] = useState(false);
    const [newsCategory, setNewsCategory] = useState('skincare');
    const [loading, setLoading] = useState({
        products: true,
        reviews: true,
        news: true,
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch all data
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch products and reviews
                const [productsRes, reviewsRes] = await Promise.all([
                    instance.get('/get-all-products?limit=12'),
                    instance.get('/get-all-reviews?limit=4'),
                ]);
                setProducts(productsRes.data.products || []);
                setReviews(reviewsRes.data || []);
                setLoading((prev) => ({ ...prev, products: false, reviews: false }));

                // Fetch beauty news
                await fetchBeautyNews('skincare');
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to load data. Please try again later.');
                setLoading({ products: false, reviews: false, news: false });
            }
        };
        fetchAllData();
    }, []);

    // Fetch beauty news by category
    const fetchBeautyNews = async (category) => {
        setLoading((prev) => ({ ...prev, news: true }));
        setError(null);

        try {
            let apiUrl = '';
            switch (category) {
                case 'skincare':
                    apiUrl = 'https://newsapi.org/v2/everything?q=skincare&apiKey=104717d2cbc741308f52646449dbfab3';
                    break;
                case 'makeup':
                    apiUrl = 'https://newsapi.org/v2/everything?q=makeup&apiKey=104717d2cbc741308f52646449dbfab3';
                    break;
                case 'haircare':
                    apiUrl = 'https://newsapi.org/v2/everything?q=haircare&apiKey=104717d2cbc741308f52646449dbfab3';
                    break;
                default:
                    apiUrl = 'https://newsapi.org/v2/everything?q=beauty&apiKey=104717d2cbc741308f52646449dbfab3';
            }

            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.articles) {
                const formattedNews = data.articles.slice(0, 4).map((article) => ({
                    title: article.title,
                    image: article.urlToImage || '/default-news.jpg',
                    description: article.description || 'No description available.',
                    date: article.publishedAt,
                    url: article.url,
                    content: article.content,
                }));
                setBeautyNews(formattedNews);
            } else {
                setBeautyNews([]);
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            setError('Failed to fetch news. Please try again later.');
        } finally {
            setLoading((prev) => ({ ...prev, news: false }));
        }
    };

    const handleNewsClick = (newsItem) => {
        setSelectedNews(newsItem);
        setOpenNewsDialog(true);
    };

    const handleCloseNewsDialog = () => {
        setOpenNewsDialog(false);
    };

    const handleCategoryChange = (category) => {
        setNewsCategory(category);
        fetchBeautyNews(category);
    };

    // Helper functions
    const getCloudinaryImage = (publicId) => {
        return publicId
            ? `https://res.cloudinary.com/dppaihihm/image/upload/w_500,h_500,c_fill/${publicId}.jpg`
            : '/placeholder-product.png';
    };

    const renderRating = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} color="#ffc107" />);
        }

        if (hasHalfStar) {
            stars.push(<FaStarHalfAlt key="half" color="#ffc107" />);
        }

        return stars;
    };

    // Product data processing
    const newArrivals = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

    const recommendedProducts = [...products].filter((product) => product.price_range === 'highend').slice(0, 4);

    const bestSellers = [...products].sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0)).slice(0, 4);

    const newReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

    if (loading.products || loading.reviews) {
        return (
            <div className="loading-container">
                <CircularProgress />
                <Typography>Loading content...</Typography>
            </div>
        );
    }

    return (
        <div className="home-container">
            <Header />
            <div className="home-wrap">
                {/* Banner Slogan */}
                <div className="slogan-banner">
                    <img src={Slogan} alt="slogan banner" className="slogan" />
                </div>

                {/* Hot News Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h2>Hot News</h2>
                        <div className="news-filter">
                            <select
                                value={newsCategory}
                                onChange={(e) => handleCategoryChange(e.target.value)}
                                className="category-select"
                            >
                                <option value="skincare">Skincare</option>
                                <option value="makeup">Makeup</option>
                                <option value="haircare">Haircare</option>
                                <option value="beauty">Beauty</option>
                            </select>
                        </div>
                    </div>

                    {loading.news ? (
                        <div className="loading-news">
                            <CircularProgress size={24} />
                        </div>
                    ) : error ? (
                        <Typography color="error">{error}</Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {beautyNews.map((news, index) => (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Card className="news-card" onClick={() => handleNewsClick(news)}>
                                        <CardMedia component="img" height="140" image={news.image} alt={news.title} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h6" className="news-title">
                                                {news.title.length > 50
                                                    ? `${news.title.substring(0, 50)}...`
                                                    : news.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {new Date(news.date).toLocaleDateString()}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                    <div className="section-footer">
                        <Button variant="outlined" onClick={() => navigate('/news')} endIcon={<FaExternalLinkAlt />}>
                            See All News
                        </Button>
                    </div>
                </div>

                {/* New Arrivals Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h2>New Arrivals</h2>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/products')}
                            endIcon={<FaExternalLinkAlt />}
                        >
                            View All
                        </Button>
                    </div>
                    <Grid container spacing={3}>
                        {newArrivals.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.product_id}>
                                <Card
                                    className="product-card"
                                    onClick={() => navigate(`/product-detail/${product.product_id}`)}
                                >
                                    <div className="product-badge">
                                        {product.createdAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                                            <Chip label="NEW" color="primary" size="small" />
                                        )}
                                    </div>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={getCloudinaryImage(product.picture)}
                                        alt={product.product_name}
                                        className="product-image"
                                    />
                                    <CardContent className="product-content">
                                        <Typography gutterBottom variant="h6" className="product-name">
                                            {product.product_name}
                                        </Typography>
                                        <Typography variant="subtitle2" className="product-brand">
                                            {product.brand}
                                        </Typography>
                                        <div className="product-rating">
                                            {renderRating(product.averageRating || 0)}
                                            <span>({product.reviewCount || 0})</span>
                                        </div>
                                        <Typography variant="body2" className="product-price">
                                            ${product.price || 'N/A'}
                                        </Typography>
                                    </CardContent>
                                    <IconButton className="wishlist-icon">
                                        <FaRegHeart />
                                    </IconButton>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                {/* Best Sellers Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h2>Best Sellers</h2>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/products?sort=rating')}
                            endIcon={<FaExternalLinkAlt />}
                        >
                            View All
                        </Button>
                    </div>
                    <Grid container spacing={3}>
                        {bestSellers.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.product_id}>
                                <Card
                                    className="product-card"
                                    onClick={() => navigate(`/product-detail/${product.product_id}`)}
                                >
                                    <div className="product-badge">
                                        <Chip label="BEST" color="secondary" size="small" />
                                    </div>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={getCloudinaryImage(product.picture)}
                                        alt={product.product_name}
                                        className="product-image"
                                    />
                                    <CardContent className="product-content">
                                        <Typography gutterBottom variant="h6" className="product-name">
                                            {product.product_name}
                                        </Typography>
                                        <Typography variant="subtitle2" className="product-brand">
                                            {product.brand}
                                        </Typography>
                                        <div className="product-rating">
                                            <Rating
                                                value={product.averageRating || 0}
                                                precision={0.5}
                                                readOnly
                                                size="small"
                                            />
                                            <span>({product.reviewCount || 0})</span>
                                        </div>
                                        <Typography variant="body2" className="product-price">
                                            ${product.price || 'N/A'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                {/* Recommended Products Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h2>Recommended For You</h2>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/products?filter=highend')}
                            endIcon={<FaExternalLinkAlt />}
                        >
                            View All
                        </Button>
                    </div>
                    <Grid container spacing={3}>
                        {recommendedProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.product_id}>
                                <Card
                                    className="product-card premium"
                                    onClick={() => navigate(`/product-detail/${product.product_id}`)}
                                >
                                    <div className="product-badge">
                                        <Chip label="PREMIUM" color="warning" size="small" />
                                    </div>
                                    <CardMedia
                                        component="img"
                                        height="250"
                                        image={getCloudinaryImage(product.picture)}
                                        alt={product.product_name}
                                        className="product-image"
                                    />
                                    <CardContent className="product-content">
                                        <Typography gutterBottom variant="h6" className="product-name">
                                            {product.product_name}
                                        </Typography>
                                        <Typography variant="subtitle2" className="product-brand">
                                            {product.brand}
                                        </Typography>
                                        <div className="product-features">
                                            {product.hypoallergenic && <Chip label="Hypoallergenic" size="small" />}
                                            {product.cruelty_free && <Chip label="Cruelty Free" size="small" />}
                                        </div>
                                        <Typography variant="body2" className="product-price">
                                            ${product.price || 'N/A'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                {/* Product Categories Section */}
                <div className="section-container">
                    <h2>Shop By Category</h2>
                    <Grid container spacing={2}>
                        {['Cleansers', 'Moisturizers', 'Serums', 'Sunscreen'].map((category) => (
                            <Grid item xs={6} sm={3} key={category}>
                                <Card
                                    className="category-card"
                                    onClick={() => navigate(`/products?category=${category.toLowerCase()}`)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="150"
                                        image={`/categories/${category.toLowerCase()}.jpg`}
                                        alt={category}
                                    />
                                    <CardContent>
                                        <Typography align="center" variant="h6">
                                            {category}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>

                {/* New Reviews Section */}
                <div className="section-container">
                    <div className="section-header">
                        <h2>Latest Reviews</h2>
                        <Button variant="outlined" onClick={() => navigate('/reviews')} endIcon={<FaExternalLinkAlt />}>
                            View All
                        </Button>
                    </div>
                    <Grid container spacing={3}>
                        {newReviews.map((review) => (
                            <Grid item xs={12} sm={6} md={3} key={review.review_id}>
                                <Card
                                    className="review-card"
                                    onClick={() => navigate(`/review-detail/${review.review_id}`)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={getCloudinaryImage(review.img_path) || '/placeholder-review.png'}
                                        alt={review.title}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {review.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {review.user_id} • {new Date(review.createdAt).toLocaleDateString()}
                                        </Typography>
                                        <div className="review-rating">
                                            <Rating value={review.rating || 0} precision={0.5} readOnly size="small" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </div>

            {/* News Dialog */}
            <Dialog open={openNewsDialog} onClose={handleCloseNewsDialog} fullWidth maxWidth="md">
                <DialogTitle>{selectedNews?.title}</DialogTitle>
                <DialogContent>
                    <img
                        src={selectedNews?.image}
                        alt={selectedNews?.title}
                        style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                    />
                    <Typography variant="body1" paragraph>
                        {selectedNews?.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Published on {new Date(selectedNews?.date).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {selectedNews?.content}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href={selectedNews?.url}
                        target="_blank"
                        endIcon={<FaExternalLinkAlt />}
                        sx={{ mr: 2 }}
                    >
                        Read Full Article
                    </Button>
                    <Button variant="outlined" onClick={handleCloseNewsDialog}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>

            <Footer />
            <div className="chatbox-wrapper">
                <ChatBox />
            </div>
        </div>
    );
}

export default Homepage;
