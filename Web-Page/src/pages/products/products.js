// src/pages/products/Products.js

import './products.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    InputAdornment,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Pagination,
    Checkbox,
    ListItemText,
} from '@mui/material';
import { Search, FavoriteBorder } from '@mui/icons-material';
import instance from '../../axios/instance.js';

function Products() {
    const cloudName = 'dppaihihm';
    const uploadPreset = 'Beauty Web';
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productType, setProductType] = useState('');
    const [skinType, setSkinType] = useState([]); // now an array for multi-select
    const [priceRange, setPriceRange] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch products with pagination and filters
    const fetchProducts = async (page = 1, filters = {}) => {
        setLoading(true);
        try {
            const params = {
                page,
                limit: 12,
                ...filters,
            };

            const response = await instance.get('/get-all-products', { params });
            const { products: fetchedProducts, total, totalPages } = response.data;

            setProducts(fetchedProducts);
            setFilteredProducts(fetchedProducts);
            setTotalPages(totalPages);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle filter changes
    useEffect(() => {
        const filters = {};
        if (productType) filters.product_type = productType;
        if (skinType.length > 0) filters.skin_types = skinType; // send as array
        if (priceRange) filters.price_range = priceRange;

        fetchProducts(1, filters);
    }, [productType, skinType, priceRange]);

    // Handle search
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            fetchProducts();
            return;
        }

        try {
            const response = await instance.post('/get-products-by-name', {
                product_name: searchTerm,
                page: 1,
                limit: 12,
            });

            const { products: searchedProducts, total, totalPages } = response.data;
            setProducts(searchedProducts);
            setFilteredProducts(searchedProducts);
            setTotalPages(totalPages);
            setPage(1);
        } catch (err) {
            console.error('Error searching products:', err);
        }
    };

    // Handle page change
    const handlePageChange = (event, value) => {
        setPage(value);
        fetchProducts(value, {
            product_type: productType,
            skin_types: skinType,
            price_range: priceRange,
        });
    };

    // Unified skin types, skin problems, and skin goals (from user model)
    const skinTypeOptions = ['normal', 'dry', 'oily', 'combination', 'sensitive'];
    const skinProblemFields = [
        { name: 'acne_prone', label: 'Mụn' },
        { name: 'dull_skin', label: 'Da xỉn màu' },
        { name: 'large_pores', label: 'Lỗ chân lông to' },
        { name: 'uneven', label: 'Da không đều màu' },
        { name: 'dark_spot', label: 'Đốm nâu/thâm' },
        { name: 'redness', label: 'Đỏ da' },
        { name: 'dehydrated', label: 'Thiếu nước' },
        { name: 'wrinkles', label: 'Nếp nhăn' },
    ];
    const skinGoalFields = [
        { name: 'hydration', label: 'Thiếu ẩm' },
        { name: 'acne_control', label: 'Kiểm soát mụn' },
        { name: 'anti_aging', label: 'Chống lão hóa' },
        { name: 'brightening', label: 'Làm sáng' },
        { name: 'oil_control', label: 'Kiểm soát dầu' },
        { name: 'smooth_and_repair', label: 'Làm mịn & phục hồi' },
    ];

    // Handle skin problem filters (using boolean fields from your service)
    const handleSkinProblemFilter = (problem) => {
        if (!problem) {
            setFilteredProducts(products);
            return;
        }
        setFilteredProducts(products.filter((p) => p[problem]));
    };

    return (
        <div className="product-wrap">
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Search bar */}
                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={9}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Search for a product..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Search />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <button
                                className="search-button"
                                onClick={handleSearch}
                                style={{
                                    width: '100%',
                                    padding: '14px',
                                    backgroundColor: '#1976d2',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                }}
                            >
                                Search
                            </button>
                        </Grid>
                    </Grid>
                </Paper>

                {/* Filters */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Product Type</InputLabel>
                            <Select
                                value={productType}
                                onChange={(e) => setProductType(e.target.value)}
                                label="Product Type"
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Cleanser">Cleanser</MenuItem>
                                <MenuItem value="Toner">Toner</MenuItem>
                                <MenuItem value="Serum">Serum</MenuItem>
                                <MenuItem value="Moisturizer">Moisturizer</MenuItem>
                                <MenuItem value="Sunscreen">Sunscreen</MenuItem>
                                <MenuItem value="Mask">Mask</MenuItem>
                                <MenuItem value="Treatment">Treatment</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Skin Types</InputLabel>
                            <Select
                                multiple
                                value={skinType}
                                onChange={(e) =>
                                    setSkinType(
                                        typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value,
                                    )
                                }
                                label="Skin Types"
                                renderValue={(selected) => selected.join(', ')}
                            >
                                {skinTypeOptions.map((option) => (
                                    <MenuItem key={option} value={option}>
                                        <Checkbox checked={skinType.indexOf(option) > -1} />
                                        <ListItemText primary={option.charAt(0).toUpperCase() + option.slice(1)} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Skin Problem Filters */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Skin Problem</InputLabel>
                            <Select
                                value=""
                                onChange={(e) => handleSkinProblemFilter(e.target.value)}
                                label="Skin Problem"
                            >
                                <MenuItem value="">All</MenuItem>
                                {skinProblemFields.map((problem) => (
                                    <MenuItem key={problem.name} value={problem.name}>
                                        {problem.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Skin Goal Filters */}
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Skin Goal</InputLabel>
                            <Select
                                value=""
                                onChange={(e) => handleSkinProblemFilter(e.target.value)}
                                label="Skin Goal"
                            >
                                <MenuItem value="">All</MenuItem>
                                {skinGoalFields.map((goal) => (
                                    <MenuItem key={goal.name} value={goal.name}>
                                        {goal.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Product display */}
                {loading ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', my: 4 }}>
                        Loading products...
                    </Typography>
                ) : (
                    <>
                        <Grid container spacing={3}>
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                                        <Card
                                            sx={{
                                                maxWidth: 300,
                                                mx: 'auto',
                                                boxShadow: 3,
                                                cursor: 'pointer',
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                            onClick={() => navigate(`/product-detail/${product.product_id}`)}
                                        >
                                            <CardMedia
                                                component="img"
                                                height="200"
                                                image={
                                                    product.picture
                                                        ? `https://res.cloudinary.com/${cloudName}/image/upload/${product.picture}.jpg`
                                                        : 'https://via.placeholder.com/300'
                                                }
                                                alt={product.product_name}
                                                sx={{ objectFit: 'contain', p: 1 }}
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography variant="h6" fontWeight="bold" noWrap>
                                                    {product.product_name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {product.brand} • {product.product_type}
                                                </Typography>
                                                <Typography variant="body2" sx={{ mt: 1 }}>
                                                    For:{' '}
                                                    {Array.isArray(product.skin_types)
                                                        ? product.skin_types.join(', ')
                                                        : ''}{' '}
                                                    skin
                                                </Typography>
                                            </CardContent>
                                            <FavoriteBorder
                                                sx={{
                                                    position: 'absolute',
                                                    top: 10,
                                                    right: 10,
                                                    color: 'white',
                                                    backgroundColor: 'rgba(0,0,0,0.3)',
                                                    borderRadius: '50%',
                                                    p: 0.5,
                                                }}
                                            />
                                        </Card>
                                    </Grid>
                                ))
                            ) : (
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{ textAlign: 'center', width: '100%', mt: 4 }}
                                >
                                    No products found. Try different filters.
                                </Typography>
                            )}
                        </Grid>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Grid container justifyContent="center" sx={{ mt: 4 }}>
                                <Pagination
                                    count={totalPages}
                                    page={page}
                                    onChange={handlePageChange}
                                    color="primary"
                                    size="large"
                                />
                            </Grid>
                        )}
                    </>
                )}
            </Container>
            <Footer />
        </div>
    );
}

export default Products;
