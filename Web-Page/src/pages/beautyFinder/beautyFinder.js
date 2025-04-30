import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, CircularProgress } from '@mui/material';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';

function BeautyFinder() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const pageTitle = "Beauty Finder | Top-rated Spas & Clinics Nearby";

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Here you would integrate with Google Maps API
    console.log('Searching for beauty clinics near:', address);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle results here
    }, 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container component="main" maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom 
            sx={{ 
              color: '#3C4B57',
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center'
            }}
          >
            {pageTitle}
          </Typography>
          
          <Typography 
            variant="body1" 
            paragraph 
            sx={{ 
              color: '#3C4B57',
              fontSize: '1.1rem',
              mb: 4,
              textAlign: 'center'
            }}
          >
            Discover the best-rated beauty spas and clinics near you. Enter your location to find top-quality facial treatments, rejuvenating massages, and professional skincare services in your area.
          </Typography>
          
          <Box 
            component="form" 
            onSubmit={handleSearch}
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: 2,
              maxWidth: 500,
              mx: 'auto'
            }}
          >
            <TextField
              fullWidth
              label="Enter your address or zip code"
              variant="outlined"
              size="medium"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            
            <Button 
              type="submit"
              variant="contained" 
              size="large"
              disabled={isLoading}
              sx={{
                backgroundColor: '#3C4B57',
                '&:hover': {
                  backgroundColor: '#2a3640',
                },
                py: 1.5,
                fontSize: '1rem'
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} sx={{ color: 'white', mr: 2 }} />
                  Searching...
                </>
              ) : (
                'Find Beauty Services'
              )}
            </Button>
          </Box>
        </Paper>

        {/* Results section would go here */}
        {/* You would map through API results and display them */}
      </Container>
      
      <Footer />
    </Box>
  );
};

export default BeautyFinder;