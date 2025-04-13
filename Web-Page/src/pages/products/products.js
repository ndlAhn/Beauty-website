import { useEffect, useState } from 'react';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
    Paper,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from '@mui/material';
import { FavoriteBorder, Search, Close } from '@mui/icons-material';
import instance from '../../axios/instance';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

function Products() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    // Bộ lọc
    const [productType, setProductType] = useState('');
    const [skinType, setSkinType] = useState('');
    const [skinProblem, setSkinProblem] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await instance.get('/get-all-products');
            setProducts(res.data);
            setFilteredProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        let filtered = products.filter((product) =>
            product.product_name.toLowerCase().includes(searchTerm.toLowerCase()),
        );

        if (productType) filtered = filtered.filter((p) => p.product_type === productType);
        if (skinType) filtered = filtered.filter((p) => p.skin_type === skinType);
        if (skinProblem) filtered = filtered.filter((p) => p.skin_problem === skinProblem);
        if (priceRange) filtered = filtered.filter((p) => p.price_range === priceRange);

        setFilteredProducts(filtered);
    }, [searchTerm, productType, skinType, skinProblem, priceRange, products]);

    // Xử lý mở Dialog khi bấm vào Product
    const handleOpenDialog = (product) => {
        setSelectedProduct(product);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setSelectedProduct(null);
        setOpenDialog(false);
    };

    return (
        <>
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
                                <MenuItem value="All skin type">All</MenuItem>
                                <MenuItem value="Oily skin ">Oily</MenuItem>
                                <MenuItem value="Dry skin">Dry</MenuItem>
                                <MenuItem value="Combination skin">Combination</MenuItem>
                                <MenuItem value="Normal skin">Normal skin</MenuItem>
                                <MenuItem value="Sensitive skin">Sensitive skin</MenuItem>
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
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.product_id}>
                                <Card
                                    sx={{ maxWidth: 300, mx: 'auto', boxShadow: 3 }}
                                    onClick={() => handleOpenDialog(product)}
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
                                    <IconButton sx={{ position: 'absolute', top: 10, right: 10 }}>
                                        <FavoriteBorder />
                                    </IconButton>
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

            {/* Popup Product Details */}
            <Dialog fullScreen open={openDialog} onClose={handleCloseDialog}>
                {selectedProduct && (
                    <>
                        <DialogTitle>
                            {selectedProduct.product_name}
                            <IconButton sx={{ position: 'absolute', right: 10, top: 10 }} onClick={handleCloseDialog}>
                                <Close />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent>
                            <img
                                src={`https://res.cloudinary.com/dppaihihm/image/upload/${selectedProduct.picture}.jpg`}
                                alt={selectedProduct.product_name}
                                width="100%"
                            />
                            <Typography>
                                <strong>Brand:</strong> {selectedProduct.brand}
                            </Typography>
                            <Typography>
                                <strong>Product Type:</strong> {selectedProduct.product_type}
                            </Typography>
                            <Typography>
                                <strong>Skin Type:</strong> {selectedProduct.skin_type}
                            </Typography>
                            <Typography>
                                <strong>Skin Problem:</strong> {selectedProduct.skin_problem}
                            </Typography>
                            <Typography>
                                <strong>Price Range:</strong> {selectedProduct.price_range}
                            </Typography>
                            <Typography>
                                <strong>Description:</strong> {selectedProduct.product_description}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseDialog}>Close</Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>

            <Footer />
        </>
    );
}

export default Products;
