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
} from '@mui/material';

function News() {
    const [news, setNews] = useState([]);
    const [selectedNews, setSelectedNews] = useState(null);
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState('skincare');

    useEffect(() => {
        fetchBeautyNews(category);
    }, [category]);

    const fetchBeautyNews = async (selectedCategory) => {
        let apiUrl = '';

        switch (selectedCategory) {
            case 'skincare':
                apiUrl = 'https://www.allure.com/rss/news.xml'; // API có ảnh
                break;
            case 'makeup':
                apiUrl = 'https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline';
                break;
            case 'haircare':
                apiUrl = 'https://www.beautyglimpse.com/api/hair-care/';
                break;
            case 'beauty-trends':
                apiUrl = 'https://www.cosmeticsdesign.com/Article/rss.xml';
                break;
            default:
                apiUrl = 'https://www.allure.com/rss/news.xml';
        }

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Nếu API trả về XML, cần parse dữ liệu
            if (selectedCategory === 'beauty-trends' || selectedCategory === 'skincare') {
                const parser = new DOMParser();
                const xml = parser.parseFromString(data, 'text/xml');
                const items = Array.from(xml.getElementsByTagName('item'));
                const parsedNews = items.map((item) => ({
                    title: item.getElementsByTagName('title')[0].textContent,
                    urlToImage:
                        item.getElementsByTagName('media:thumbnail')[0]?.getAttribute('url') || '/default-news.jpg',
                    description: item.getElementsByTagName('description')[0].textContent,
                    publishedAt: item.getElementsByTagName('pubDate')[0].textContent,
                    link: item.getElementsByTagName('link')[0].textContent,
                }));
                setNews(parsedNews);
            } else {
                // Nếu API không có ảnh, lấy ảnh mặc định
                const formattedData = data.map((item) => ({
                    title: item.name,
                    urlToImage: item.image_link || '/default-news.jpg',
                    description: item.description || 'No description available.',
                    publishedAt: 'Unknown',
                    link: item.product_link || '#',
                }));
                setNews(formattedData);
            }
        } catch (error) {
            console.error('Error fetching beauty news:', error);
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
            <div className="news-wrap">
                <div className="new-content-wrap">
                    <div className="news-intro">
                        <h2>Update new beauty trends with Beauty Insight</h2>
                        <p>Discover the latest trends, expert advice, and must-try beauty techniques.</p>
                    </div>

                    {/* Bộ lọc danh mục tin tức */}
                    <div className="news-filter-wrap">
                        <FiFilter className="news-filter-icon" />
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="news-filter-select"
                        >
                            <MenuItem value="skincare">Skincare</MenuItem>
                            <MenuItem value="makeup">Makeup</MenuItem>
                            <MenuItem value="haircare">Haircare</MenuItem>
                            <MenuItem value="beauty-trends">Beauty Trends</MenuItem>
                        </Select>
                    </div>

                    {/* Danh sách tin tức */}
                    <div className="news-list">
                        {news.length > 0 ? (
                            news.map((item, index) => (
                                <Card key={index} className="news-card" onClick={() => handleOpen(item)}>
                                    <CardMedia
                                        component="img"
                                        height="400px"
                                        image={item.urlToImage}
                                        alt={item.title}
                                        className="news-image"
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="div" className="news-title">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className="news-meta">
                                            {item.publishedAt !== 'Unknown'
                                                ? new Date(item.publishedAt).toLocaleDateString()
                                                : 'Unknown'}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <p>No news available.</p>
                        )}
                    </div>
                </div>
            </div>

            <Footer />

            {/* Popup hiển thị chi tiết tin tức */}
            <Dialog fullScreen open={open} onClose={handleClose}>
                <DialogTitle>{selectedNews?.title}</DialogTitle>
                <DialogContent>
                    <img src={selectedNews?.urlToImage} alt={selectedNews?.title} className="news-popup-image" />
                    <Typography variant="body1" className="news-popup-content">
                        {selectedNews?.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" className="news-popup-meta">
                        Published on{' '}
                        {selectedNews?.publishedAt !== 'Unknown'
                            ? new Date(selectedNews?.publishedAt).toLocaleDateString()
                            : 'Unknown'}
                    </Typography>
                    <Button variant="contained" color="primary" href={selectedNews?.link} target="_blank">
                        Read More
                    </Button>
                    <Button variant="contained" color="secondary" onClick={handleClose} className="news-popup-close">
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default News;
