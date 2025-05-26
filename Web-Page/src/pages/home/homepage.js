import './homepage.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import Slogan from '../../pages/home/slogan.png';
import { FaRegHeart, FaExternalLinkAlt } from 'react-icons/fa';
import ChatBox from '../../components/chatBox/chatBox.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    CircularProgress,
} from '@mui/material';
import { FiFilter } from 'react-icons/fi';
import instance from '../../axios/instance.js';
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

    // Fetch tất cả dữ liệu
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                // Fetch products và reviews
                const [productsRes, reviewsRes] = await Promise.all([
                    instance.get('/get-all-products'),
                    instance.get('/get-all-reviews'),
                ]);
                setProducts(productsRes.data);
                setReviews(reviewsRes.data);
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

    // Fetch beauty news theo category
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
        return publicId ? `https://res.cloudinary.com/dppaihihm/image/upload/${publicId}.jpg` : null;
    };

    const newArrivals = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

    const newReviews = [...reviews].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 4);

    const recommendedProducts = [...products].filter((product) => product.price_range === 'highend').slice(0, 4);

    if (loading.products || loading.reviews) {
        return (
            <div className="loading-container">
                <CircularProgress />
                <Typography>Loading content...</Typography>
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="home-wrap">
                {/* Banner Slogan */}
                <div className="slogan-banner">
                    <img src={Slogan} alt="slogan banner" className="slogan" />
                </div>

                {/* Hot News Section */}
                <div className="home-news-content">
                    <div className="section-header">
                        <h3>Hot News</h3>
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
                    <div className="home-new-more">
                        <a href="/news">See all news</a>
                    </div>
                </div>

                {/* Các sections khác giữ nguyên... */}
                <div className="home-news-content">
                    <h3>New arrivals</h3>
                    <Grid container spacing={3}>
                        {newArrivals.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.product_id}>
                                <Card onClick={() => navigate(`/product-detail/${product.product_id}`)}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={getCloudinaryImage(product.picture) || '/placeholder-product.png'}
                                        alt={product.product_name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {product.product_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.brand} • {product.product_type}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <div className="home-new-more">
                        <a href="/products">See all products</a>
                    </div>
                </div>

                {/* New Reviews Section */}
                <div className="home-news-content">
                    <h3>New reviews</h3>
                    <Grid container spacing={3}>
                        {newReviews.map((review) => (
                            <Grid item xs={12} sm={6} md={3} key={review.review_id}>
                                <Card onClick={() => navigate(`/review-detail/${review.review_id}`)}>
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
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <div className="home-new-more">
                        <a href="/reviews">See all reviews</a>
                    </div>
                </div>

                {/* Recommended Products Section */}
                <div className="home-news-content">
                    <h3>Recommends</h3>
                    <Grid container spacing={3}>
                        {recommendedProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={3} key={product.product_id}>
                                <Card onClick={() => navigate(`/product-detail/${product.product_id}`)}>
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={getCloudinaryImage(product.picture) || '/placeholder-product.png'}
                                        alt={product.product_name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6">
                                            {product.product_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.price_range} • {product.product_type}
                                        </Typography>
                                    </CardContent>
                                    <FaRegHeart className="heart-icon" />
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <div className="home-new-more">
                        <a href="/products">See all</a>
                    </div>
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
