import './productDetails.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { useEffect, useState } from 'react';
import {
    IconButton,
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Collapse,
    CircularProgress,
    Chip,
    Stack,
} from '@mui/material';
import { Favorite, FavoriteBorder, Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import instance from '../../axios/instance.js';

function ProductDetails() {
    const [isFavorite, setIsFavorite] = useState(false);
    const [openToc, setOpenToc] = useState(true);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const cloudName = 'dppaihihm';

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await instance.get(`/product-detail/${id}`);
                setProduct(response.data);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to load product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const TABLE_OF_CONTENTS = [
        { id: 'brand', label: 'Brand' },
        { id: 'product-type', label: 'Product Type' },
        { id: 'capacity', label: 'Capacity' },
        { id: 'price-range', label: 'Price Range' },
        { id: 'skin-type', label: 'Skin Type' },
        { id: 'benefits', label: 'Benefits' },
        { id: 'ingredients', label: 'Ingredients' },
        { id: 'product-description', label: 'Description' },
        { id: 'uses', label: 'Uses' },
        { id: 'warning', label: 'Warning' },
    ];

    const handleFavoriteClick = () => {
        setIsFavorite(!isFavorite);
    };

    const handleTocClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const renderBenefits = () => {
        const benefits = [];
        if (product?.acne) benefits.push('Acne');
        if (product?.aging) benefits.push('Aging');
        if (product?.dried) benefits.push('Dry Skin');
        if (product?.oily) benefits.push('Oily Skin');
        if (product?.skin_recovery) benefits.push('Skin Recovery');
        if (product?.hydration) benefits.push('Hydration');
        if (product?.acne_control) benefits.push('Acne Control');
        if (product?.anti_aging) benefits.push('Anti-Aging');
        if (product?.brightening) benefits.push('Brightening');
        if (product?.oil_control) benefits.push('Oil Control');
        if (product?.smooth_and_repair) benefits.push('Smooth & Repair');

        return benefits.length > 0 ? (
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {benefits.map((benefit) => (
                    <Chip key={benefit} label={benefit} variant="outlined" />
                ))}
            </Stack>
        ) : (
            <p>No specific benefits listed</p>
        );
    };

    const renderIngredients = () => {
        if (!product?.ingredients || product.ingredients.length === 0) {
            return <p>No ingredient information available</p>;
        }

        return (
            <div>
                <Typography variant="subtitle1" gutterBottom>
                    Total Ingredients: {product.ingredients.length}
                </Typography>
                <List dense>
                    {product.ingredients?.map((ingredient, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={ingredient?.name} secondary={ingredient?.function} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );
    };

    if (loading) {
        return (
            <div>
                <Header />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
                <Footer />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Header />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <Typography color="error">{error}</Typography>
                </Box>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div>
                <Header />
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <Typography>Product not found</Typography>
                </Box>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Header />
            <div className="review-details-wrap">
                <div className="review-details-content-wrap">
                    {/* Title & Like */}
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            width: '100%',
                            mb: 3,
                        }}
                    >
                        <Box className="review-details-title" sx={{ textAlign: 'center' }}>
                            <Typography variant="h4" component="h3" sx={{ fontWeight: 'bold', margin: 0 }}>
                                {product.product_name}
                            </Typography>
                        </Box>
                        <IconButton
                            onClick={handleFavoriteClick}
                            size="medium"
                            sx={{
                                position: 'absolute',
                                right: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                        >
                            {isFavorite ? (
                                <Favorite color="error" fontSize="large" />
                            ) : (
                                <FavoriteBorder fontSize="large" />
                            )}
                        </IconButton>
                    </Box>

                    {/* Table of Contents */}
                    <Box
                        sx={{
                            position: 'relative',
                            mb: 4,
                            backgroundColor: 'rgb(223,181,182)',
                            borderRadius: '8px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            maxWidth: '400px',
                        }}
                    >
                        <IconButton
                            onClick={() => setOpenToc(!openToc)}
                            sx={{
                                width: '100%',
                                justifyContent: 'flex-start',
                                py: 2,
                                px: 3,
                                color: 'rgb(60,75,87)',
                                '&:hover': { backgroundColor: 'rgba(255,255,255,0.2)' },
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
                                            <ListItemText
                                                primary={item.label}
                                                primaryTypographyProps={{ fontWeight: 'medium' }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Collapse>
                    </Box>

                    {/* Product Image */}
                    {product.picture && (
                        <Box sx={{ mb: 4, textAlign: 'center' }}>
                            <img
                                src={`https://res.cloudinary.com/${cloudName}/image/upload/${product.picture}.jpg`}
                                alt={product.product_name}
                                className="review-product-image"
                                style={{
                                    maxWidth: '100%',
                                    height: 'auto',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                }}
                            />
                        </Box>
                    )}

                    {/* Product Details Sections */}
                    <Box id="brand" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Brand
                        </Typography>
                        <Typography>{product.brand}</Typography>
                    </Box>

                    <Box id="product-type" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Product Type
                        </Typography>
                        <Typography>{product.product_type}</Typography>
                    </Box>

                    <Box id="capacity" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Capacity
                        </Typography>
                        <Typography>{product.capacity}</Typography>
                    </Box>

                    <Box id="price-range" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Price Range
                        </Typography>
                        <Typography>{product.price_range}</Typography>
                    </Box>

                    <Box id="skin-type" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Skin Type
                        </Typography>
                        <Typography>{product.skin_type}</Typography>
                    </Box>

                    <Box id="benefits" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Benefits
                        </Typography>
                        {renderBenefits()}
                    </Box>

                    <Box id="ingredients" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Ingredients
                        </Typography>
                        {renderIngredients()}
                    </Box>

                    <Box id="product-description" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Description
                        </Typography>
                        <Typography whiteSpace="pre-line">
                            {product.product_description || 'No description available'}
                        </Typography>
                    </Box>

                    <Box id="uses" className="element-review-details" sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                            Uses
                        </Typography>
                        <Typography whiteSpace="pre-line">
                            {product.uses || 'No usage information available'}
                        </Typography>
                    </Box>

                    {product.warning && (
                        <Box id="warning" className="element-review-details" sx={{ mb: 4 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'error.main' }}>
                                Warning
                            </Typography>
                            <Typography color="error" whiteSpace="pre-line">
                                {product.warning}
                            </Typography>
                        </Box>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;
