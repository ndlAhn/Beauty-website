import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Paper, CircularProgress, Grid, Card, CardContent, Divider } from '@mui/material';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';

function BeautyFinder() {
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const pageTitle = "Beauty Finder | Top-rated Spas & Clinics Nearby";

  // Mock data for demonstration
  const mockResults = {
    clinics: [
      { name: "Glamour Aesthetic Clinic", address: "123 Beauty Street, District 1" },
      { name: "SkinRevive Clinic", address: "456 Wellness Avenue, District 3" }
    ],
    spas: [
      { name: "Tranquility Spa", address: "789 Relaxation Road, District 2" }
    ],
    stores: [
      { name: "Luxe Cosmetics", address: "321 Skincare Lane, District 4" }
    ]
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResults(mockResults); // Use mock data
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Container component="main" maxWidth="md" sx={{ flex: 1, py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#3C4B57', fontWeight: 'bold', mb: 3, textAlign: 'center' }}>
            {pageTitle}
          </Typography>
          
          <Typography variant="body1" paragraph sx={{ color: '#3C4B57', fontSize: '1.1rem', mb: 4, textAlign: 'center' }}>
            Discover the best-rated beauty spas, clinics, and cosmetics stores near you.
          </Typography>
          
          <Box component="form" onSubmit={handleSearch} sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 600, mx: 'auto' }}>
            <TextField
              fullWidth
              label="Enter your address"
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
                backgroundColor: 'var(--light-pink)',
                color: '#3C4B57',
                '&:hover': { backgroundColor: '#845B5B' },
                py: 1.5,
                fontSize: '1rem',
                width: 200,
                height: 60,
                mx: 'auto'
              }}
            >
              {isLoading ? <CircularProgress size={24} sx={{ color: 'inherit' }} /> : 'Search'}
            </Button>
          </Box>

          {/* Results Section */}
          {results && (
            <Box sx={{ mt: 4 }}>
              {/* Beauty Clinics */}
              {results.clinics.length > 0 && (
                <>
                  <Typography variant="h5" sx={{ color: '#3C4B57', mb: 2 }}>
                    Beauty Clinics
                  </Typography>
                  <Grid container spacing={3}>
                    {results.clinics.map((clinic, index) => (
                      <Grid item xs={12} sm={6} key={`clinic-${index}`}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="h6">{clinic.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {clinic.address}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ my: 3 }} />
                </>
              )}

              {/* Spas */}
              {results.spas.length > 0 && (
                <>
                  <Typography variant="h5" sx={{ color: '#3C4B57', mb: 2 }}>
                    Spas
                  </Typography>
                  <Grid container spacing={3}>
                    {results.spas.map((spa, index) => (
                      <Grid item xs={12} sm={6} key={`spa-${index}`}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="h6">{spa.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {spa.address}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  <Divider sx={{ my: 3 }} />
                </>
              )}

              {/* Cosmetics Stores */}
              {results.stores.length > 0 && (
                <>
                  <Typography variant="h5" sx={{ color: '#3C4B57', mb: 2 }}>
                    Cosmetics Stores
                  </Typography>
                  <Grid container spacing={3}>
                    {results.stores.map((store, index) => (
                      <Grid item xs={12} sm={6} key={`store-${index}`}>
                        <Card elevation={2}>
                          <CardContent>
                            <Typography variant="h6">{store.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {store.address}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Box>
          )}
        </Paper>
      </Container>
      
      <Footer />
    </Box>
  );
};

export default BeautyFinder;