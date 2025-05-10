import './createProduct.css';
import { useContext, useState, useEffect, useRef } from 'react';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { CgAsterisk } from 'react-icons/cg';
import { IoIosCloudUpload } from 'react-icons/io';
import { MdCancel, MdEdit, MdDelete } from 'react-icons/md';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    MenuItem,
    Select,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    TextareaAutosize,
    Chip,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    InputAdornment,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function CreateProduct() {
    const cloudName = 'dppaihihm';
    const uploadPreset = 'Beauty Web';
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);

    const [publicId, setPublicId] = useState('');
    const [state] = useContext(StateContext);
    const [products, setProducts] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [formData, setFormData] = useState({
        product_name: '',
        product_details: '',
        brand: '',
        product_type: '',
        uses: '',
        capacity: '',
        skin_type: '',
        skin_problem: '',
        product_description: '',
        price_range: '',
        warning: '',
    });
    const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        if (window.cloudinary && uploadButtonRef.current) {
            uploadWidgetRef.current = window.cloudinary.createUploadWidget(
                { cloudName, uploadPreset },
                (error, result) => {
                    if (!error && result && result.event === 'success') {
                        console.log('Upload successful:', result.info);
                        setPublicId(result.info.public_id);
                    }
                },
            );
        }

        fetchProducts();
        fetchIngredients();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await instance.get('/get-all-products');
            setProducts(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchIngredients = async () => {
        try {
            const res = await instance.get('/get-all-ingredients');
            console.log(ingredients);
            setIngredients(res.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const searchIngredients = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            const res = await instance.get(`/search-ingredients/${query}`);
            setSearchResults(res.data);
        } catch (error) {
            console.error('Error searching ingredients:', error);
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleUploadClick = () => {
        if (uploadWidgetRef.current) {
            uploadWidgetRef.current.open();
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        searchIngredients(value);
    };

    const toggleIngredient = (ingredient) => {
        setSelectedIngredients((prev) => {
            const isSelected = prev.some((item) => item.ingredient_id === ingredient.ingredient_id);
            if (isSelected) {
                return prev.filter((item) => item.ingredient_id !== ingredient.ingredient_id);
            } else {
                return [...prev, ingredient];
            }
        });
    };

    const handleAddIngredients = () => {
        setOpenIngredientDialog(false);
        setSearchTerm('');
        setSearchResults([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.product_name || !publicId) {
            alert('Product name and image are required');
            return;
        }

        try {
            const productResponse = await instance.post('/create-product', {
                ...formData,
                picture: publicId,
                user_id: state.userData.userId,
            });

            if (productResponse.status === 200) {
                const productId = productResponse.data.product_id;

                if (selectedIngredients.length > 0) {
                    await instance.post('/product-ingredients', {
                        product_id: productId,
                        ingredients: selectedIngredients.map((ing) => ({
                            ingredient_id: ing.ingredient_id,
                        })),
                    });
                }

                alert('Product created successfully!');
                fetchProducts();
                setFormData({
                    product_name: '',
                    product_details: '',
                    brand: '',
                    product_type: '',
                    uses: '',
                    capacity: '',
                    skin_type: '',
                    skin_problem: '',
                    product_description: '',
                    price_range: '',
                    warning: '',
                });
                setPublicId('');
                setSelectedIngredients([]);
            }
        } catch (error) {
            console.error('Error submitting product:', error);
            alert(`Error: ${error.response?.data?.message || 'Something went wrong'}`);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Are you sure you want to delete this product?')) return;

        try {
            await instance.delete(`/delete-product/${productId}`);
            alert('Product deleted successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    return (
        <div>
            <SubHeader />
            <div className="review-post-wrap">
                <ReviewSidebar />
                <div className="profile-content-wrap">
                    <div className="profile-content">
                        <Typography variant="h4" sx={{ color: '#3c4b57', mb: 2 }}>
                            CREATE PRODUCT
                        </Typography>
                        <form className="create-product-area" onSubmit={handleSubmit}>
                            {[
                                { label: 'Product Name', name: 'product_name' },
                                { label: 'Product Details', name: 'product_details' },
                                { label: 'Brand', name: 'brand' },
                                { label: 'Uses', name: 'uses' },
                                { label: 'Capacity', name: 'capacity' },
                                { label: 'Product Description', name: 'product_description' },
                                { label: 'Warning', name: 'warning' },
                            ].map((field, index) => (
                                <TextField
                                    key={index}
                                    label={field.label}
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                    sx={{ my: 1 }}
                                />
                            ))}

                            {/* Dropdowns */}
                            {[
                                {
                                    label: 'Product Type',
                                    name: 'product_type',
                                    options: ['Cleanser', 'Toner', 'Serum'],
                                },
                                { label: 'Skin Type', name: 'skin_type', options: ['Oily', 'Dry', 'Combination'] },
                                { label: 'Skin Problem', name: 'skin_problem', options: ['Acne', 'Aging'] },
                                {
                                    label: 'Price Range',
                                    name: 'price_range',
                                    options: ['Drugstore', 'Midrange', 'High-end'],
                                },
                            ].map((dropdown, index) => (
                                <FormControl key={index} fullWidth sx={{ my: 1 }}>
                                    <InputLabel id={`${index}-label`} sx={{ color: '#3c4b57' }}>
                                        {dropdown.label}
                                    </InputLabel>
                                    <Select
                                        id={index + 'create-product-select'}
                                        labelId={`${index}-label`}
                                        name={dropdown.name}
                                        value={formData[dropdown.name]}
                                        onChange={handleChange}
                                        label={dropdown.label}
                                    >
                                        {dropdown.options.map((option) => (
                                            <MenuItem key={option} value={option.toLowerCase()}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            ))}

                            {/* Ingredients Selection */}
                            <div className="review-input-area">
                                <h5>Ingredients:</h5>
                                <Button variant="outlined" onClick={() => setOpenIngredientDialog(true)} sx={{ ml: 2 }}>
                                    Add Ingredients
                                </Button>
                            </div>

                            {/* Selected Ingredients Chips */}
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                                {selectedIngredients.map((ingredient) => (
                                    <Chip
                                        key={ingredient.ingredient_id}
                                        label={ingredient.name}
                                        onDelete={() => toggleIngredient(ingredient)}
                                        sx={{
                                            backgroundColor: '#e3f2fd',
                                            '& .MuiChip-deleteIcon': {
                                                color: '#1976d2',
                                                '&:hover': {
                                                    color: '#0d47a1',
                                                },
                                            },
                                        }}
                                    />
                                ))}
                            </Box>

                            {/* Ingredient Search Dialog */}
                            <Dialog
                                open={openIngredientDialog}
                                onClose={() => {
                                    setOpenIngredientDialog(false);
                                    setSearchTerm('');
                                    setSearchResults([]);
                                }}
                                fullWidth
                                maxWidth="sm"
                            >
                                <DialogTitle>Add Ingredients</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        label="Search Ingredients"
                                        fullWidth
                                        variant="outlined"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                        sx={{ mb: 2 }}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                    />

                                    {isSearching ? (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                                            <CircularProgress />
                                        </Box>
                                    ) : (
                                        <List
                                            sx={{
                                                maxHeight: 400,
                                                overflow: 'auto',
                                                border: '1px solid #eee',
                                                borderRadius: 1,
                                            }}
                                        >
                                            {searchResults.length > 0
                                                ? searchResults.map((ingredient) => (
                                                      <ListItem
                                                          key={ingredient.ingredient_id}
                                                          disablePadding
                                                          secondaryAction={
                                                              <Checkbox
                                                                  edge="end"
                                                                  checked={selectedIngredients.some(
                                                                      (item) =>
                                                                          item.ingredient_id ===
                                                                          ingredient.ingredient_id,
                                                                  )}
                                                                  onChange={() => toggleIngredient(ingredient)}
                                                              />
                                                          }
                                                      >
                                                          <ListItemButton onClick={() => toggleIngredient(ingredient)}>
                                                              <ListItemText primary={ingredient.name} />
                                                          </ListItemButton>
                                                      </ListItem>
                                                  ))
                                                : ingredients.map((ingredient, index) => (
                                                      <ListItem
                                                          key={ingredient.ingredient_id}
                                                          disablePadding
                                                          secondaryAction={
                                                              <Checkbox
                                                                  edge="end"
                                                                  checked={selectedIngredients.some(
                                                                      (item) =>
                                                                          item.ingredient_id ===
                                                                          ingredient.ingredient_id,
                                                                  )}
                                                                  onChange={() => toggleIngredient(ingredient)}
                                                              />
                                                          }
                                                      >
                                                          <ListItemButton onClick={() => toggleIngredient(ingredient)}>
                                                              <ListItemText primary={ingredient.name} />
                                                          </ListItemButton>
                                                      </ListItem>
                                                  ))}
                                        </List>
                                    )}
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        onClick={() => {
                                            setOpenIngredientDialog(false);
                                            setSearchTerm('');
                                            setSearchResults([]);
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button onClick={handleAddIngredients} variant="contained">
                                        Add Selected
                                    </Button>
                                </DialogActions>
                            </Dialog>

                            <textarea
                                onChange={handleChange}
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                            ></textarea>

                            {/* Image Upload */}
                            <div className="review-input-area">
                                <span className="asterisk">
                                    <h5>Picture</h5>
                                    <CgAsterisk style={{ color: 'red' }} />
                                </span>
                                <button
                                    type="button"
                                    onClick={handleUploadClick}
                                    ref={uploadButtonRef}
                                    className="product-upload-btn"
                                >
                                    Upload picture
                                </button>
                                {publicId && (
                                    <div className="image-preview">
                                        <img
                                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`}
                                            alt="Uploaded"
                                            className="preview-img"
                                        />
                                        <button
                                            type="button"
                                            className="remove-image-btn"
                                            onClick={() => setPublicId('')}
                                        >
                                            <MdCancel size={24} color="red" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="post-area">
                                <button className="post-product-btn" type="submit">
                                    POST PRODUCT
                                </button>
                            </div>
                        </form>

                        {/* Products Table */}
                        <TableContainer component={Paper} sx={{ mt: 4 }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Product Name</TableCell>
                                        <TableCell>Product Type</TableCell>
                                        <TableCell>Skin Type</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products.map((product) => (
                                        <TableRow key={product.product_id}>
                                            <TableCell>
                                                <img
                                                    src={`https://res.cloudinary.com/${cloudName}/image/upload/${product.picture}.jpg`}
                                                    alt={product.product_name}
                                                    width="50"
                                                />
                                            </TableCell>
                                            <TableCell>{product.product_name}</TableCell>
                                            <TableCell>{product.product_type}</TableCell>
                                            <TableCell>{product.skin_type}</TableCell>
                                            <TableCell>
                                                <Button
                                                    color="error"
                                                    startIcon={<MdDelete />}
                                                    onClick={() => handleDelete(product.product_id)}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;
