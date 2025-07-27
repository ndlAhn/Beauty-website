import React, { useEffect, useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography, Grid, Card, CardContent, CardMedia,
  Pagination, CircularProgress, Box, Chip, Button,
  Container, Paper, TextField, InputAdornment,
  FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText
} from '@mui/material';
import { Search, FavoriteBorder } from '@mui/icons-material';
import Header from '../../../components/header/header';
import Footer from '../../../components/footer/footer';
import StateContext from '../../../context/context.context';
import './recommendations.css';

const ITEMS_PER_PAGE = 12;
const CLOUD_NAME = 'dppaihihm';

function Recommendations() {
  const cloudName = 'dppaihihm';
  const [state] = useContext(StateContext);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [productType, setProductType] = useState('');
  const [skinType, setSkinType] = useState([]);
  const [priceRange, setPriceRange] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  const fetchRecommendations = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const username = state.userData?.username;
      if (!username) {
        throw new Error('Please login to view recommendations');
      }

      const response = await fetch(`http://localhost:3001/api/recommend/${username}`, {
        headers: { 'Accept': 'application/json' }
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status} status`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        throw new Error(`Server returned unexpected format: ${text.substring(0, 50)}...`);
      }

      const { data } = await response.json();
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format received');
      }

      const validatedProducts = data.map(product => ({
        ...product,
        product_type: product.product_type || 'Uncategorized',
        skin_types: Array.isArray(product.skin_types) ? product.skin_types : [],
        price: product.price || 0,
        picture: product.picture || null
      }));

      setProducts(validatedProducts);
      setFilteredProducts(validatedProducts);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  }, [state.userData]);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  useEffect(() => {
    let filtered = [...products];
    
    if (productType) {
      filtered = filtered.filter(product => 
        product.product_type.toLowerCase() === productType.toLowerCase()
      );
    }
    
    if (skinType.length > 0) {
      filtered = filtered.filter(product => 
        skinType.some(type => 
          product.skin_types.map(t => t.toLowerCase()).includes(type.toLowerCase())
        )
      );
    }
    
    if (priceRange) {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => {
        const price = product.price || 0;
        return price >= min && (max ? price <= max : true);
      });
    }
    
    setFilteredProducts(filtered);
    setPage(1);
  }, [products, productType, skinType, priceRange]);

  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setFilteredProducts(products);
      return;
    }

    const searchLower = searchTerm.toLowerCase();
    const filtered = products.filter(product => 
      product.product_name?.toLowerCase().includes(searchLower) ||
      product.brand?.toLowerCase().includes(searchLower)
    );
    
    setFilteredProducts(filtered);
    setPage(1);
  };

  const handleSkinProblemFilter = (problem) => {
    if (!problem) {
      setFilteredProducts(products);
      return;
    }
    setFilteredProducts(products.filter((p) => p[problem]));
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const currentProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  return (
    <div className="recommendation-page">
      <Header />
      <Container maxWidth="lg" sx={{ py: 4 }}>
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
              <Button
                variant="contained"
                onClick={handleSearch}
                fullWidth
                sx={{
                  height: '56px',
                  backgroundColor: '#1976d2',
                  '&:hover': {
                    backgroundColor: '#1565c0'
                  }
                }}
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Paper>

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

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress size={60} />
          </Box>
        ) : error ? (
          <Box sx={{ 
            textAlign: 'center', 
            p: 3,
            backgroundColor: '#fff8f8',
            borderRadius: 2,
            maxWidth: 600,
            mx: 'auto',
            my: 4
          }}>
            <Typography variant="h6" color="error" gutterBottom>
              {error.includes('login') ? 'Authentication Required' : 'Error'}
            </Typography>
            <Typography sx={{ mb: 2 }}>{error}</Typography>
            <Button
              variant="contained"
              onClick={fetchRecommendations}
            >
              Retry
            </Button>
          </Box>
        ) : (
          <>
            <div className='recommendation-header'>
              <Typography variant="h4" component="h2" gutterBottom>
                Personalized Recommendations
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                These products are specially selected based on your skin profile.
              </Typography>
            </div>

            <Grid container spacing={3}>
              {currentProducts.length > 0 ? (
                currentProducts.map((product) => (
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
                        position: 'relative'
                      }}
                      onClick={() => navigate(`/product-detail/${product.product_id}`)}
                    >
                      {product.matchPercentage && (
                        <Chip 
                          label={`${Math.round(product.matchPercentage)}% match`}
                          color="primary"
                          size="small"
                          sx={{
                            position: 'absolute',
                            top: 10,
                            left: 10,
                            zIndex: 1,
                            fontWeight: 'bold'
                          }}
                        />
                      )}
                      
                      <CardMedia
                        component="img"
                        height="200"
                        image='https://via.placeholder.com/300'
                        
                        alt={product.product_name || 'Product image'}
                        sx={{ objectFit: 'contain', p: 1 }}
                        
                      />
                      
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="h6" fontWeight="bold" noWrap>
                          {product.product_name || 'Unnamed Product'}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          For: {product.skin_types?.join(', ') || 'All skin types'}
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
                  sx={{ 
                    textAlign: 'center', 
                    width: '100%', 
                    mt: 4,
                    p: 3,
                    backgroundColor: '#f9f9f9',
                    borderRadius: 2
                  }}
                >
                  {products.length === 0 
                    ? 'No recommendations available. Please update your skin profile.'
                    : 'No products match your current filters.'}
                </Typography>
              )}
            </Grid>

            {totalPages > 1 && (
              <Grid container justifyContent="center" sx={{ mt: 4, mb: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
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

export default Recommendations;