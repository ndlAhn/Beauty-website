import './productDetails.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { useState } from 'react';
import { IconButton, Box, Typography, List, ListItem, ListItemButton, ListItemText, Collapse } from '@mui/material';
import { Favorite, FavoriteBorder, Menu as MenuIcon, ExpandLess, ExpandMore } from '@mui/icons-material';

function ProductDetails({ product }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [openToc, setOpenToc] = useState(true);
    const cloudName = 'dppaihihm';

    const TABLE_OF_CONTENTS = [
        { id: 'brand', label: 'Brand' },
        { id: 'product-type', label: 'Product Type' },
        { id: 'capacity', label: 'Capacity' },
        { id: 'price-range', label: 'Price Range' },
        { id: 'skin-type', label: 'Skin Type' },
        { id: 'skin-problem', label: 'Skin Problem' },
        { id: 'ingredient', label: 'Ingredients' },
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

    if (!product) return null;

    return (
        <div>
            <Header />
            <div className='review-product-content-wrap'>

                {/* Title & Like */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100%' }}>
                    <div className="review-details-title" style={{ textAlign: 'center' }}>
                        <h3 style={{ margin: 0 }}>{product.product_name}</h3>
                    </div>
                    <IconButton
                        onClick={handleFavoriteClick}
                        size="medium"
                        sx={{
                            position: 'absolute',
                            right: 0,
                            '&:hover': { backgroundColor: 'transparent' },
                        }}
                    >
                        {isFavorite ? (
                            <Favorite color="error" fontSize="large" />
                        ) : (
                            <FavoriteBorder fontSize="large" />
                        )}
                    </IconButton>
                </div>

                {/* Introduction */}
                <h5>Product information</h5>
                <p className="product-infor">{product.product_info}</p>

                {/* Table of Contents */}
                <Box sx={{
                    mb: 4,
                    backgroundColor: 'rgb(223,181,182)',
                    borderRadius: '8px',
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
                        <List>
                            {TABLE_OF_CONTENTS.map((item) => (
                                <ListItem key={item.id} disablePadding>
                                    <ListItemButton onClick={() => handleTocClick(item.id)}>
                                        <ListItemText primary={item.label} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </Box>

                {/* Product Image */}
                <img
                    src={`https://res.cloudinary.com/${cloudName}/image/upload/${product.picture}.jpg`}
                    alt={product.product_name}
                    className="review-product-image"
                />

                {/* Details */}
                <div id="brand" className='element-title'><h5>Brand:</h5><p>{product.brand}</p></div>
                <div id="product-type" className='element-title'><h5>Product type:</h5><p>{product.product_type}</p></div>
                <div id="capacity" className='element-title'><h5>Capacity:</h5><p>{product.capacity}</p></div>
                <div id="price-range" className='element-title'><h5>Price range:</h5><p>{product.price_range}</p></div>
                <div id="skin-type" className='element-title'><h5>Skin type:</h5><p>{product.skin_type}</p></div>
                <div id="skin-problem" className='element-title'><h5>Skin problem:</h5><p>{product.skin_problem}</p></div>
                <div id="ingredient" className='element-title'><h5>Ingredient:</h5><p>{product.ingredient}</p></div>
                <div id="product-description" className='element-title-coloum'><h5>Description:</h5><p>{product.product_description}</p></div>
                <div id="uses" className='element-title-coloum'><h5>Uses:</h5><p>{product.uses}</p></div>
                <div id="warning" className='element-title-coloum'><h5>Warning:</h5><p>{product.warning}</p></div>
            </div>
            <Footer />
        </div>
    );
}

export default ProductDetails;
