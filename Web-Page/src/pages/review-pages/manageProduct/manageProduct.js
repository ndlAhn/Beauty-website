import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    IconButton,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Chip,
    Stack,
    Checkbox,
    FormControlLabel,
    Autocomplete,
    ListItemText,
} from '@mui/material';
import { MdDeleteOutline, MdEdit, MdAdd } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { CgAsterisk } from 'react-icons/cg';
import SubHeader from '../../../components/subHeader/subHeader';
import StateContext from '../../../context/context.context';
import instance from '../../../axios/instance';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';

// Cloudinary Upload Widget Component
const CloudinaryUploadWidget = ({ uwConfig, setPublicId, disabled }) => {
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);
    const handleUploadClick = () => {
        if (uploadWidgetRef.current && !disabled) {
            uploadWidgetRef.current.open();
        }
    };

    useEffect(() => {
        const initializeUploadWidget = () => {
            if (window.cloudinary && uploadButtonRef.current) {
                uploadWidgetRef.current = window.cloudinary.createUploadWidget(
                    {
                        ...uwConfig,
                        cropping: true,
                        croppingAspectRatio: 1,
                        showSkipCropButton: false,
                        singleUploadAutoClose: true,
                    },
                    (error, result) => {
                        if (!error && result && result.event === 'success') {
                            setPublicId(result.info.public_id);
                        }
                    },
                );
            }
        };

        initializeUploadWidget();

        return () => {
            if (uploadWidgetRef.current) {
                uploadWidgetRef.current.destroy();
            }
        };
    }, [uwConfig, setPublicId]);

    return (
        <Button
            variant="contained"
            onClick={handleUploadClick}
            ref={uploadButtonRef}
            disabled={disabled}
            sx={{ mt: 1 }}
        >
            Upload New Image
        </Button>
    );
};

function ManageProducts() {
    const [state] = useContext(StateContext);
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [newImageId, setNewImageId] = useState(null);
    const [isCreateMode, setIsCreateMode] = useState(false);

    // Product types and skin types for dropdowns
    const productTypes = ['Cleanser', 'Toner', 'Serum', 'Moisturizer', 'Sunscreen', 'Mask', 'Treatment', 'Other'];
    const skinTypeOptions = ['normal', 'dry', 'oily', 'combination', 'sensitive'];
    const priceRanges = ['$', '$$', '$$$', '$$$$'];

    // Skin problem fields (should match user model)
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

    // Fetch products and ingredients
    useEffect(() => {
        fetchProducts();
        fetchIngredients();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await instance.get('/get-all-products');
            console.log(res.data.products);
            setProducts(res.data.products);
        } catch (err) {
            console.error('Error fetching products:', err);
        }
    };

    const fetchIngredients = async () => {
        try {
            const res = await instance.get('/get-all-ingredients');
            setIngredients(res.data);
        } catch (err) {
            console.error('Error fetching ingredients:', err);
        }
    };

    const filteredProducts = products?.filter(
        (product) =>
            product.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await instance.delete(`/delete-product/${id}`);
                setProducts(products?.filter((product) => product.product_id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    const handleEdit = (product) => {
        setCurrentProduct({
            ...product,
            skin_types: Array.isArray(product.skin_types) ? product.skin_types : [],
        });
        setSelectedIngredients(product.ingredients?.map((i) => i.ingredient_id) || []);
        setNewImageId(null);
        setIsCreateMode(false);
        setOpenDialog(true);
    };

    const handleCreate = () => {
        setCurrentProduct({
            product_name: '',
            brand: '',
            product_type: '',
            skin_types: [],
            price_range: '',
            capacity: '',
            uses: '',
            warning: '',
            product_description: '',
            acne: false,
            aging: false,
            dried: false,
            oily: false,
            skin_recovery: false,
            hydration: false,
            acne_control: false,
            anti_aging: false,
            brightening: false,
            oil_control: false,
            smooth_and_repair: false,
        });
        setSelectedIngredients([]);
        setNewImageId(null);
        setIsCreateMode(true);
        setOpenDialog(true);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'skin_types') {
            setCurrentProduct({
                ...currentProduct,
                skin_types: typeof value === 'string' ? value.split(',') : value,
            });
        } else {
            setCurrentProduct({
                ...currentProduct,
                [name]: type === 'checkbox' ? checked : value,
            });
        }
    };

    const handleIngredientChange = (event, newValue) => {
        setSelectedIngredients(newValue);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const productData = {
                ...currentProduct,
                picture: newImageId || currentProduct.picture,
                ingredients: selectedIngredients.map((id) => ({ ingredient_id: id })),
            };
            if (!productData.skin_types || productData.skin_types.length === 0) {
                alert('Please select at least one skin type');
                setIsSubmitting(false);
                return;
            }
            if (isCreateMode) {
                await instance.post('/create-product', productData);
                alert('Product created successfully!');
            } else {
                await instance.put(`/update-product/${currentProduct.product_id}`, productData);
                alert('Product updated successfully!');
            }
            fetchProducts();
            setOpenDialog(false);
        } catch (error) {
            console.error('Error saving product:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const requiredFields = ['product_name', 'brand', 'product_type', 'skin_type', 'price_range', 'capacity', 'uses'];

    return (
        <Box>
            <SubHeader />
            <Box display="flex">
                <ReviewSidebar />

                <Box flex={1} p={3}>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                        <Typography variant="h4">Manage Products</Typography>
                        <Button variant="contained" startIcon={<MdAdd />} onClick={handleCreate}>
                            Add New Product
                        </Button>
                    </Box>

                    {/* Search Bar */}
                    <Box display="flex" alignItems="center" mb={2}>
                        <TextField
                            label="Search products..."
                            variant="outlined"
                            fullWidth
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            InputProps={{
                                endAdornment: <IoIosSearch />,
                            }}
                        />
                    </Box>

                    {/* Products Table */}
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Brand</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Skin Type</TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredProducts.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={7} align="center">
                                            No products found.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <TableRow key={product.product_id}>
                                            <TableCell>
                                                {product.picture && (
                                                    <img
                                                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${product.picture}.jpg`}
                                                        alt={product.product_name}
                                                        width="60"
                                                        height="60"
                                                        style={{ borderRadius: '8px', objectFit: 'cover' }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{product.product_name}</TableCell>
                                            <TableCell>{product.brand}</TableCell>
                                            <TableCell>{product.product_type}</TableCell>
                                            <TableCell>
                                                {Array.isArray(product.skin_types) ? product.skin_types.join(', ') : ''}
                                            </TableCell>
                                            <TableCell>{product.price_range}</TableCell>
                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(product)}
                                                    disabled={isSubmitting}
                                                >
                                                    <MdEdit size={24} />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(product.product_id)}
                                                    disabled={isSubmitting}
                                                >
                                                    <MdDeleteOutline size={24} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>

            {/* Product Dialog (Create/Edit) */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="md">
                <DialogTitle>{isCreateMode ? 'Create New Product' : 'Edit Product'}</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ mt: 2 }}>
                        {/* Required Fields */}
                        {requiredFields.map((field) => (
                            <Box key={field} sx={{ mb: 3 }}>
                                <Box display="flex" alignItems="center" mb={1}>
                                    <CgAsterisk style={{ color: 'red', marginRight: 8 }} />
                                    <Typography variant="subtitle1">
                                        {field
                                            .split('_')
                                            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                            .join(' ')}
                                    </Typography>
                                </Box>
                                {field === 'product_type' ? (
                                    <FormControl fullWidth>
                                        <Select
                                            name={field}
                                            value={currentProduct?.[field] || ''}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        >
                                            {productTypes.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : field === 'skin_types' ? (
                                    <FormControl fullWidth>
                                        <InputLabel>Skin Types</InputLabel>
                                        <Select
                                            name="skin_types"
                                            multiple
                                            value={currentProduct?.skin_types || []}
                                            onChange={handleChange}
                                            label="Skin Types"
                                            renderValue={(selected) =>
                                                selected
                                                    .map((option) => option.charAt(0).toUpperCase() + option.slice(1))
                                                    .join(', ')
                                            }
                                            disabled={isSubmitting}
                                        >
                                            {skinTypeOptions.map((option) => (
                                                <MenuItem key={option} value={option}>
                                                    <Checkbox
                                                        checked={currentProduct?.skin_types?.indexOf(option) > -1}
                                                    />
                                                    <ListItemText
                                                        primary={option.charAt(0).toUpperCase() + option.slice(1)}
                                                    />
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : field === 'price_range' ? (
                                    <FormControl fullWidth>
                                        <Select
                                            name={field}
                                            value={currentProduct?.[field] || ''}
                                            onChange={handleChange}
                                            disabled={isSubmitting}
                                        >
                                            {priceRanges.map((range) => (
                                                <MenuItem key={range} value={range}>
                                                    {range}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                ) : (
                                    <TextField
                                        fullWidth
                                        name={field}
                                        value={currentProduct?.[field] || ''}
                                        onChange={handleChange}
                                        disabled={isSubmitting}
                                    />
                                )}
                            </Box>
                        ))}

                        {/* Optional Fields */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Product Description
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                name="product_description"
                                value={currentProduct?.product_description || ''}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Warning
                            </Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                name="warning"
                                value={currentProduct?.warning || ''}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </Box>

                        {/* Skin Problems */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Skin Problems
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {skinProblemFields.map((field) => (
                                    <FormControlLabel
                                        key={field.name}
                                        control={
                                            <Checkbox
                                                checked={currentProduct?.[field.name] || false}
                                                onChange={handleChange}
                                                name={field.name}
                                                color="primary"
                                            />
                                        }
                                        label={field.label}
                                    />
                                ))}
                            </Stack>
                        </Box>
                        {/* Skin Goals */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Skin Goals
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {skinGoalFields.map((field) => (
                                    <FormControlLabel
                                        key={field.name}
                                        control={
                                            <Checkbox
                                                checked={currentProduct?.[field.name] || false}
                                                onChange={handleChange}
                                                name={field.name}
                                                color="primary"
                                            />
                                        }
                                        label={field.label}
                                    />
                                ))}
                            </Stack>
                        </Box>

                        {/* Ingredients */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Ingredients
                            </Typography>
                            <Autocomplete
                                multiple
                                options={ingredients}
                                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
                                value={selectedIngredients}
                                onChange={handleIngredientChange}
                                renderInput={(params) => (
                                    <TextField {...params} variant="outlined" placeholder="Select ingredients" />
                                )}
                                renderTags={(value, getTagProps) =>
                                    value.map((option, index) => (
                                        <Chip
                                            key={option}
                                            label={ingredients.find((i) => i.ingredient_id === option)?.name || option}
                                            {...getTagProps({ index })}
                                        />
                                    ))
                                }
                                isOptionEqualToValue={(option, value) =>
                                    option.ingredient_id === value || option === value
                                }
                                disabled={isSubmitting}
                            />
                        </Box>

                        {/* Image Upload */}
                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle1" sx={{ mb: 1 }}>
                                Product Image
                            </Typography>

                            {/* Current Image */}
                            {currentProduct?.picture && !newImageId && (
                                <Box sx={{ mb: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        Current Image:
                                    </Typography>
                                    <img
                                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${currentProduct.picture}.jpg`}
                                        alt="Current"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '200px',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            )}

                            {/* Cloudinary Upload Widget */}
                            <CloudinaryUploadWidget
                                uwConfig={{
                                    cloudName: 'dppaihihm',
                                    uploadPreset: 'Beauty Web',
                                }}
                                setPublicId={setNewImageId}
                                disabled={isSubmitting}
                            />

                            {/* New Image Preview */}
                            {newImageId && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        New Image Preview:
                                    </Typography>
                                    <img
                                        src={`https://res.cloudinary.com/dppaihihm/image/upload/${newImageId}.jpg`}
                                        alt="New Preview"
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '200px',
                                            borderRadius: '8px',
                                        }}
                                    />
                                </Box>
                            )}
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            setOpenDialog(false);
                            setNewImageId(null);
                        }}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isSubmitting}>
                        {isSubmitting
                            ? isCreateMode
                                ? 'Creating...'
                                : 'Updating...'
                            : isCreateMode
                            ? 'Create Product'
                            : 'Update Product'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default ManageProducts;
