import React, { useEffect, useState } from 'react';
import './ingredients.css';
import {
    Box,
    Typography,
    Grid,
    TextField,
    InputAdornment,
    Avatar,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Button,
    Stack,
    Paper,
    Menu,
    MenuItem,
    IconButton,
    Input,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import { FiFilter, FiArrowUp, FiArrowDown } from 'react-icons/fi';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import instance from '../../axios/instance.js';

function Ingredients() {
    const [allIngredients, setAllIngredients] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');

    const fetchIngredients = async () => {
        setIsLoading(true);
        try {
            const response = await instance.get('/get-all-ingredients');
            const data = await response.data;
            setAllIngredients(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            setError('Failed to fetch ingredients. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const searchIngredients = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        try {
            const response = await instance.get(`/search-ingredients/${searchQuery}`);
            const data = await response.data;
            setSearchResults(data);
            setError(null);
        } catch (error) {
            console.error('Error searching ingredients:', error);
            setError('Failed to search ingredients. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const sortIngredients = (data) => {
        return data.sort((a, b) => {
            if (sortBy === 'name') {
                return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            } else if (sortBy === 'function') {
                return sortOrder === 'asc'
                    ? a.function.localeCompare(b.function)
                    : b.function.localeCompare(a.function);
            }
            return 0;
        });
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    useEffect(() => {
        fetchIngredients();
    }, []);

    const handleSearch = () => {
        searchIngredients();
    };

    const displayedIngredients = searchQuery.trim() ? searchResults : allIngredients;
    const sortedIngredients = sortIngredients([...displayedIngredients]);

    return (
        <div>
            <Header />
            <Box sx={{ flexGrow: 1, p: 3 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom>
                            Look up and cosmetic ingredients analysis
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Curious about what's in your cosmetics? With <strong>Beauty Insight</strong>, you can easily
                            look up and analyze cosmetic ingredients. Discover the benefits, potential risks, and
                            overall effectiveness of each component in your beauty products. Stay informed and make
                            smarter choices for your skincare and makeup routine. Empower yourself with the knowledge to
                            choose the best for your skin!
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography variant="h6" gutterBottom>
                                Enter the names of the ingredients:
                            </Typography>
                            <Input
                                placeholder="Enter ingredients"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                variant="outlined"
                                sx={{ mb: 2, marginLeft: '10px' }}
                            />
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{ mb: 4 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Look up'}
                        </Button>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            Note: When entering multiple ingredients, the ingredients must be separated by commas ( , )!
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <FiFilter style={{ marginRight: 8 }} />
                            <Typography variant="h6">
                                {searchQuery.trim() ? 'Search Results' : 'All Ingredients'}
                            </Typography>
                        </Box>
                        {error ? (
                            <Typography color="error" paragraph>
                                {error}
                            </Typography>
                        ) : isLoading ? (
                            <Box display="flex" justifyContent="center">
                                <CircularProgress />
                            </Box>
                        ) : (
                            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
                                <Table>
                                    <TableHead sx={{ bgcolor: 'primary.main' }}>
                                        <TableRow>
                                            <TableCell
                                                sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                                                onClick={() => handleSort('name')}
                                            >
                                                Name{' '}
                                                {sortBy === 'name' &&
                                                    (sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />)}
                                            </TableCell>
                                            <TableCell
                                                sx={{ color: 'white', fontWeight: 'bold', cursor: 'pointer' }}
                                                onClick={() => handleSort('function')}
                                            >
                                                Function{' '}
                                                {sortBy === 'function' &&
                                                    (sortOrder === 'asc' ? <FiArrowUp /> : <FiArrowDown />)}
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sortedIngredients.map((ingredient) => (
                                            <TableRow
                                                key={ingredient.ingredient_id}
                                                sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                                            >
                                                <TableCell>{ingredient.name}</TableCell>
                                                <TableCell>{ingredient.function}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </div>
    );
}

export default Ingredients;
