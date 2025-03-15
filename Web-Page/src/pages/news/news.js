import './news.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { useState, useEffect } from 'react';
import { FiFilter } from 'react-icons/fi';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Select,
    MenuItem,
    Grid,
    Box,
    CircularProgress,
} from '@mui/material';

function News() {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('skincare');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBeautyNews(category);
    }, [category]);

    const fetchBeautyNews = async (selectedCategory) => {
        setIsLoading(true);
        setError(null);

        let apiUrl = '';

        switch (selectedCategory) {
            case 'skincare':
                apiUrl = 'https://newsapi.org/v2/everything?q=skincare&apiKey=104717d2cbc741308f52646449dbfab3'; // Thay YOUR_NEWSAPI_KEY bằng key của bạn
                break;
            case 'makeup':
                apiUrl = 'https://newsapi.org/v2/everything?q=makeup&apiKey=104717d2cbc741308f52646449dbfab3';
                break;
            case 'haircare':
                apiUrl = 'https://newsapi.org/v2/everything?q=haircare&apiKey=104717d2cbc741308f52646449dbfab3';
                break;
            case 'beauty-trends':
                apiUrl = 'https://newsapi.org/v2/everything?q=beauty trends&apiKey=104717d2cbc741308f52646449dbfab3';
                break;
            default:
                apiUrl = 'https://newsapi.org/v2/everything?q=beauty&apiKey=104717d2cbc741308f52646449dbfab3';
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.articles) {
                const formattedData = data.articles.map((article) => ({
                    title: article.title,
                    urlToImage: article.urlToImage || '/default-news.jpg',
                    description: article.description || 'No description available.',
                    publishedAt: article.publishedAt,
                    link: article.url,
                    content: article.content,
                }));
                setNews(formattedData);
            } else {
                setNews([]);
            }
        } catch (error) {
            console.error('Error fetching beauty news:', error);
            setError('Failed to fetch news. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Mở popup chi tiết bài viết
    const handleOpen = (newsItem) => {
        setSelectedNews(newsItem);
        setOpen(true);
    };

    // Đóng popup
    const handleClose = () => {
        setOpen(false);
        setSelectedNews(null);
    };

    return (
        <div>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Update New Beauty Trends with Beauty Insight
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Discover the latest trends, expert advice, and must-try beauty techniques.
                        </Typography>
                    </Grid>

                    {/* Bộ lọc danh mục tin tức */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                            <FiFilter style={{ fontSize: '24px' }} />
                            <Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                variant="outlined"
                                sx={{ minWidth: 150 }}
                            >
                                <MenuItem value="skincare">Skincare</MenuItem>
                                <MenuItem value="makeup">Makeup</MenuItem>
                                <MenuItem value="haircare">Haircare</MenuItem>
                                <MenuItem value="beauty-trends">Beauty Trends</MenuItem>
                            </Select>
                        </Box>
                    </Grid>

                    {/* Danh sách tin tức */}
                    <Grid item xs={12}>
                        {isLoading ? (
                            <Box display="flex" justifyContent="center">
                                <CircularProgress />
                            </Box>
                        ) : error ? (
                            <Typography color="error" paragraph>
                                {error}
                            </Typography>
                        ) : news.length > 0 ? (
                            <Grid container spacing={3}>
                                {news.map((item, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card className="news-card" onClick={() => handleOpen(item)}>
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={item.urlToImage}
                                                alt={item.title}
                                            />
                                            <CardContent>
                                                <Typography variant="h6" component="div" className="news-title">
                                                    {item.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    className="news-meta"
                                                >
                                                    {new Date(item.publishedAt).toLocaleDateString()}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="body1" paragraph>
                                No news available.
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Box>

            <Footer />

            {/* Popup hiển thị chi tiết tin tức */}
            <Dialog fullScreen open={open} onClose={handleClose}>
                <DialogTitle>{selectedNews?.title}</DialogTitle>
                <DialogContent>
                    <img
                        src={selectedNews?.urlToImage}
                        alt={selectedNews?.title}
                        style={{ width: '100%', height: 'auto', marginBottom: '16px' }}
                    />
                    <Typography variant="body1" paragraph>
                        {selectedNews?.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        Published on {new Date(selectedNews?.publishedAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {selectedNews?.content}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        href={selectedNews?.link}
                        target="_blank"
                        sx={{ mr: 2 }}
                    >
                        Read More
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default News;
