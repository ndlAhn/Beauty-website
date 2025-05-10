// src/pages/products/Products.js

import './products.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Grid, Card, CardMedia, CardContent, Typography,
    TextField, InputAdornment, Paper, Select, MenuItem,
    FormControl, InputLabel
} from '@mui/material';
import { Search, FavoriteBorder } from '@mui/icons-material';
import instance from '../../axios/instance.js';

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [productType, setProductType] = useState('');
    const [skinType, setSkinType] = useState('');
    const [skinProblem, setSkinProblem] = useState('');
    const [priceRange, setPriceRange] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        instance.get('/get-all-products')
            .then(res => {
                setProducts(res.data);
                setFilteredProducts(res.data);
            })
            .catch(err => console.log('Error fetching products:', err));
    }, []);

    useEffect(() => {
        let filtered = products.filter(p =>
            p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (productType) filtered = filtered.filter(p => p.product_type === productType);
        if (skinType) filtered = filtered.filter(p => p.skin_type === skinType);
        if (skinProblem) filtered = filtered.filter(p => p.skin_problem === skinProblem);
        if (priceRange) filtered = filtered.filter(p => p.price_range === priceRange);
        setFilteredProducts(filtered);
    }, [searchTerm, productType, skinType, skinProblem, priceRange, products]);

    return (
        <div className="product-wrap">
            <Header />
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Thanh tìm kiếm */}
                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Search for a product..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Paper>

                {/* Bộ lọc */}
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Product Type</InputLabel>
                            <Select value={productType} onChange={(e) => setProductType(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Cleanser">Cleanser</MenuItem>
                                <MenuItem value="Toner">Toner</MenuItem>
                                <MenuItem value="Serum">Serum</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Skin Type</InputLabel>
                            <Select value={skinType} onChange={(e) => setSkinType(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Oily skin ">Oily</MenuItem>
                                <MenuItem value="Dry skin">Dry</MenuItem>
                                <MenuItem value="Combination skin">Combination</MenuItem>
                                <MenuItem value="Normal skin">Normal</MenuItem>
                                <MenuItem value="Sensitive skin">Sensitive</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Skin Problem</InputLabel>
                            <Select value={skinProblem} onChange={(e) => setSkinProblem(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Acne">Acne</MenuItem>
                                <MenuItem value="Aging">Aging</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <FormControl fullWidth>
                            <InputLabel>Price Range</InputLabel>
                            <Select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="Drugstore">Drugstore</MenuItem>
                                <MenuItem value="Midrange">Midrange</MenuItem>
                                <MenuItem value="High-end">High-end</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                {/* Hiển thị sản phẩm */}
                <Grid container spacing={3}>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.review_id}>
                                <Card
                                    sx={{ maxWidth: 300, mx: 'auto', boxShadow: 3, cursor: 'pointer' }}
                                    onClick={() => navigate(`/product-detail/${product.review_id}`)}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={`https://res.cloudinary.com/dppaihihm/image/upload/${product.picture}.jpg`}
                                        alt={product.product_name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" fontWeight="bold">
                                            {product.product_name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {product.brand} - {product.product_type}
                                        </Typography>
                                    </CardContent>
                                    <FavoriteBorder sx={{ position: 'absolute', top: 10, right: 10 }} />
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ textAlign: 'center', width: '100%', mt: 4 }}
                        >
                            No products available.
                        </Typography>
                    )}
                </Grid>
            </Container>
            <Footer />
        </div>
    );
}

export default Products;
