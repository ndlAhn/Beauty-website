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
} from '@mui/material';

function CreateProduct() {
    const cloudName = 'dppaihihm';
    const uploadPreset = 'Beauty Web';
    const uploadWidgetRef = useRef(null);
    const uploadButtonRef = useRef(null);

    const [publicId, setPublicId] = useState('');
    const [state] = useContext(StateContext);
    const [products, setProducts] = useState([]); // Danh sách sản phẩm
    const [ingredients, setIngredients] = useState([]); // Danh sách ingredient từ database
    const [formData, setFormData] = useState({
        product_name: '',
        product_details: '',
        brand: '',
        product_type: '',
        uses: '',
        capacity: '',
        skin_type: '',
        skin_problem: '',
        ingredient: '', // ID ingredient được chọn
        product_description: '',
        price_range: '',
        warning: '',
    });

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
            console.log(res.data);
            setIngredients(res.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post('/create-product', {
                ...formData,
                picture: publicId,
                user_id: state.userData.userId,
            });

            if (response.status === 200) {
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
                    ingredient: '',
                    product_description: '',
                    price_range: '',
                    warning: '',
                });
                setPublicId('');
            } else {
                alert('Failed to create product');
            }
        } catch (error) {
            console.error('Error submitting product:', error);
        }
    };

    const handleDelete = async (productId) => {
        try {
            await instance.delete(`/delete-product/${productId}`);
            alert('Product deleted successfully!');
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
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
                            <FormControl sx={{ marginBottom: '10px' }} fullWidth className="review-input-area">
                                <Select
                                    fullWidth
                                    value={formData.ingredient}
                                    onChange={handleChange}
                                    name="ingredient"
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled>
                                        Select an ingredient
                                    </MenuItem>
                                    {ingredients.map((ingredient) => (
                                        <MenuItem key={ingredient.ingredient_id} value={ingredient.ingredient_id}>
                                            {ingredient.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <textarea onChange={handleChange} name="description" placeholder="Description"></textarea>
                            {/* Upload Image */}
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

                        {/* Table hiển thị danh sách sản phẩm */}
                        <TableContainer component={Paper}>
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
                                                    color="secondary"
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
