import React, { useEffect, useState } from 'react';
import './ingredients.css';
import Header from '../../components/header/header.js';
import Footer from '../../components/footer/footer.js';
import { FiFilter } from 'react-icons/fi';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Button,
    Grid,
    Box,
    Typography,
    CircularProgress,
} from '@mui/material';
import instance from '../../axios/instance.js';

function Ingredients() {
    const [allIngredients, setAllIngredients] = useState([]); // State để lưu tất cả nguyên liệu
    const [searchResults, setSearchResults] = useState([]); // State để lưu kết quả tìm kiếm
    const [searchQuery, setSearchQuery] = useState(''); // State để lưu giá trị tìm kiếm
    const [isLoading, setIsLoading] = useState(false); // State để hiển thị loading
    const [error, setError] = useState(null); // State để lưu lỗi

    // Hàm gọi API để lấy tất cả nguyên liệu
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

    // Hàm gọi API để tìm kiếm nguyên liệu
    const searchIngredients = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]); // Nếu ô tìm kiếm trống, xóa kết quả tìm kiếm
            return;
        }

        setIsLoading(true);
        try {
            const response = await instance.get(`/search-ingredients/${searchQuery}`);
            const data = await response.data;
            setSearchResults(data); // Cập nhật kết quả tìm kiếm
            setError(null);
        } catch (error) {
            console.error('Error searching ingredients:', error);
            setError('Failed to search ingredients. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    // Gọi API khi component được render
    useEffect(() => {
        fetchIngredients();
    }, []);

    // Xử lý khi người dùng nhấn nút "Look up"
    const handleSearch = () => {
        searchIngredients();
    };

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
                        <Typography variant="h6" gutterBottom>
                            Enter the names of the ingredients:
                        </Typography>
                        <TextField
                            multiline
                            rows={4}
                            placeholder="Enter ingredients separated by commas"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            fullWidth
                            variant="outlined"
                            sx={{ mb: 2 }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSearch}
                            sx={{ mb: 4 }}
                            disabled={isLoading} // Vô hiệu hóa nút khi đang tải
                        >
                            {isLoading ? <CircularProgress size={24} /> : 'Look up'}
                        </Button>
                        <Typography variant="body2" color="textSecondary" paragraph>
                            Note: When entering multiple ingredients, the ingredients must be separated by commas ( , )!
                        </Typography>
                    </Grid>

                    {/* Bảng kết quả tìm kiếm */}
                    {searchQuery.trim() && (
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <FiFilter style={{ marginRight: 8 }} />
                                <Typography variant="h6">Search Results</Typography>
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
                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                                                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>
                                                    Function
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {searchResults.map((ingredient) => (
                                                <TableRow
                                                    key={ingredient.ingredient_id}
                                                    sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                                                >
                                                    <TableCell>{ingredient.ingredient_id}</TableCell>
                                                    <TableCell>{ingredient.name}</TableCell>
                                                    <TableCell>{ingredient.function}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            )}
                        </Grid>
                    )}

                    {/* Bảng tất cả nguyên liệu */}
                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                            <FiFilter style={{ marginRight: 8 }} />
                            <Typography variant="h6">All Ingredients</Typography>
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
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>ID</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                                            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Function</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {allIngredients.map((ingredient) => (
                                            <TableRow
                                                key={ingredient.ingredient_id}
                                                sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                                            >
                                                <TableCell>{ingredient.ingredient_id}</TableCell>
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
