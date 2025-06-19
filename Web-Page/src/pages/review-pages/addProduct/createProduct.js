import './createProduct.css';
import { useContext, useState, useEffect, useRef } from 'react';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { CgAsterisk } from 'react-icons/cg';
import { IoIosCloudUpload } from 'react-icons/io';
import { MdCancel } from 'react-icons/md';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import {
    Button,
    MenuItem,
    Select,
    Typography,
    TextField,
    FormControl,
    InputLabel,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    InputAdornment,
    Checkbox,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    CircularProgress,
    Chip,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function CreateProduct() {
    const cloudName = 'dppaihihm';
    const uploadPreset = 'Beauty Web';
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);

    const [publicId, setPublicId] = useState('');
    const [state] = useContext(StateContext);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [formData, setFormData] = useState({
        product_name: '',
        brand: '',
        product_type: '',
        uses: '',
        capacity: '',
        skin_type: '',
        acne: false,
        aging: false,
        dried: false,
        oily: false,
        skin_recovery: false,
        product_description: '',
        price_range: '',
        warning: '',
    });
    const [openIngredientDialog, setOpenIngredientDialog] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (window.cloudinary && uploadButtonRef.current) {
            uploadWidgetRef.current = window.cloudinary.createUploadWidget(
                { cloudName, uploadPreset },
                (error, result) => {
                    if (!error && result && result.event === 'success') {
                        setPublicId(result.info.public_id);
                    }
                },
            );
        }

        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const res = await instance.get('/get-all-ingredients');
            setIngredients(res.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
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
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
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
        setIsSubmitting(true);

        if (!formData.product_name || !publicId) {
            alert('Product name and image are required');
            setIsSubmitting(false);
            return;
        }

        try {
            // Prepare the payload according to your service
            const payload = {
                ...formData,
                picture: publicId,
                ingredients: selectedIngredients.map((ing) => ({ ingredient_id: ing.ingredient_id })),
            };

            const response = await instance.post('/create-product', payload);

            if (response.status === 200) {
                alert('Product created successfully!');
                // Reset form
                setFormData({
                    product_name: '',
                    brand: '',
                    product_type: '',
                    uses: '',
                    capacity: '',
                    skin_type: '',
                    acne: false,
                    aging: false,
                    dried: false,
                    oily: false,
                    skin_recovery: false,
                    product_description: '',
                    price_range: '',
                    warning: '',
                });
                setPublicId('');
                setSelectedIngredients([]);
            }
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Error creating product. Please try again.');
        } finally {
            setIsSubmitting(false);
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
                            {/* Product Name */}
                            <TextField
                                label="Product Name"
                                name="product_name"
                                value={formData.product_name}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{ my: 1 }}
                            />

                            {/* Brand */}
                            <TextField
                                label="Brand"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{ my: 1 }}
                            />

                            {/* Product Type Dropdown */}
                            <FormControl fullWidth sx={{ my: 1 }} required>
                                <InputLabel>Product Type</InputLabel>
                                <Select
                                    name="product_type"
                                    value={formData.product_type}
                                    onChange={handleChange}
                                    label="Product Type"
                                >
                                    {[
                                        'cleanser',
                                        'toner',
                                        'serum',
                                        'moisturizer',
                                        'sunscreen',
                                        'mask',
                                        'exfoliator',
                                    ].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Skin Type Dropdown */}
                            <FormControl fullWidth sx={{ my: 1 }} required>
                                <InputLabel>Skin Type</InputLabel>
                                <Select
                                    name="skin_type"
                                    value={formData.skin_type}
                                    onChange={handleChange}
                                    label="Skin Type"
                                >
                                    {['oily', 'dry', 'normal', 'combination', 'sensitive', 'acne'].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Skin Problems Checkboxes */}
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                Skin Problems:
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                                {[
                                    { label: 'Acne', name: 'acne' },
                                    { label: 'Aging', name: 'aging' },
                                    { label: 'Dryness', name: 'dried' },
                                    { label: 'Oiliness', name: 'oily' },
                                    { label: 'Skin Recovery', name: 'skin_recovery' },
                                ].map((problem) => (
                                    <Box key={problem.name} sx={{ display: 'flex', alignItems: 'center' }}>
                                        <Checkbox
                                            name={problem.name}
                                            checked={formData[problem.name]}
                                            onChange={handleChange}
                                        />
                                        <Typography>{problem.label}</Typography>
                                    </Box>
                                ))}
                            </Box>

                            {/* Price Range Dropdown */}
                            <FormControl fullWidth sx={{ my: 1 }} required>
                                <InputLabel>Price Range</InputLabel>
                                <Select
                                    name="price_range"
                                    value={formData.price_range}
                                    onChange={handleChange}
                                    label="Price Range"
                                >
                                    {['drugstore', 'midrange', 'highend'].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option.charAt(0).toUpperCase() + option.slice(1)}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/* Capacity */}
                            <TextField
                                label="Capacity"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                fullWidth
                                required
                                sx={{ my: 1 }}
                            />

                            {/* Uses */}
                            <TextField
                                label="Uses"
                                name="uses"
                                value={formData.uses}
                                onChange={handleChange}
                                fullWidth
                                required
                                multiline
                                rows={3}
                                sx={{ my: 1 }}
                            />

                            {/* Product Description */}
                            <TextField
                                label="Product Description"
                                name="product_description"
                                value={formData.product_description}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ my: 1 }}
                            />

                            {/* Warning */}
                            <TextField
                                label="Warning"
                                name="warning"
                                value={formData.warning}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                                sx={{ my: 1 }}
                            />

                            {/* Ingredients Section */}
                            <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                Ingredients:
                            </Typography>
                            <Button variant="outlined" onClick={() => setOpenIngredientDialog(true)} sx={{ mb: 2 }}>
                                Add Ingredients
                            </Button>

                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2 }}>
                                {selectedIngredients.map((ingredient) => (
                                    <Chip
                                        key={ingredient.ingredient_id}
                                        label={ingredient.name}
                                        onDelete={() => toggleIngredient(ingredient)}
                                        sx={{ m: 0.5 }}
                                    />
                                ))}
                            </Box>

                            {/* Image Upload */}
                            <div className="review-input-area">
                                <span className="asterisk">
                                    <h5>Product Image</h5>
                                    <CgAsterisk style={{ color: 'red' }} />
                                </span>
                                <button
                                    type="button"
                                    onClick={handleUploadClick}
                                    ref={uploadButtonRef}
                                    className="product-upload-btn"
                                >
                                    <IoIosCloudUpload size={20} style={{ marginRight: '8px' }} />
                                    Upload Image
                                </button>
                                {publicId && (
                                    <div className="image-preview">
                                        <img
                                            src={`https://res.cloudinary.com/${cloudName}/image/upload/${publicId}.jpg`}
                                            alt="Uploaded product"
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

                            {/* Submit Button */}
                            <Box sx={{ mt: 3 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <CircularProgress size={24} sx={{ mr: 1 }} />
                                            Creating...
                                        </>
                                    ) : (
                                        'Create Product'
                                    )}
                                </Button>
                            </Box>
                        </form>
                    </div>
                </div>
            </div>

            {/* Ingredient Dialog */}
            <Dialog open={openIngredientDialog} onClose={() => setOpenIngredientDialog(false)} fullWidth maxWidth="sm">
                <DialogTitle>Select Ingredients</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Search Ingredients"
                        fullWidth
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{ mb: 2 }}
                    />

                    {isSearching ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <List sx={{ maxHeight: 400, overflow: 'auto' }}>
                            {(searchResults.length > 0 ? searchResults : ingredients).map((ingredient) => (
                                <ListItem
                                    key={ingredient.ingredient_id}
                                    secondaryAction={
                                        <Checkbox
                                            edge="end"
                                            checked={selectedIngredients.some(
                                                (item) => item.ingredient_id === ingredient.ingredient_id,
                                            )}
                                            onChange={() => toggleIngredient(ingredient)}
                                        />
                                    }
                                >
                                    <ListItemText primary={ingredient.name} />
                                </ListItem>
                            ))}
                        </List>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenIngredientDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddIngredients} variant="contained">
                        Add Selected
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CreateProduct;
