import './addIncredient.css';
import SubHeader from '../../../components/subHeader/subHeader';
import ReviewSidebar from '../../../components/sidebar/review-sidebar/reviewSidebar';
import { useEffect, useState } from 'react';
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
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Chip,
    Box,
    Typography,
} from '@mui/material';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

// Danh sách các thuộc tính safety
const SAFETY_PROPERTIES = [
    { value: 'non_comedogenic', label: 'Non-comedogenic' },
    { value: 'hypoallergenic', label: 'Hypoallergenic' },
    { value: 'fragrance_free', label: 'Fragrance-free' },
    { value: 'dermatologically_tested', label: 'Dermatologically tested' },
    { value: 'alcohol_free', label: 'Alcohol-free' },
    { value: 'sulphate_free', label: 'Sulphate-free' },
    { value: 'cruelty_free', label: 'Cruelty-free' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'safe_for_pregnancy', label: 'Safe for pregnancy' },
];

function AddIngredient() {
    const [ingredients, setIngredients] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        function: '',
        description: '', // Thêm trường description nếu cần
        ingredient_id: null,
        safety_properties: SAFETY_PROPERTIES.reduce(
            (acc, prop) => ({
                ...acc,
                [prop.value]: false,
            }),
            {},
        ),
    });

    useEffect(() => {
        fetchIngredients();
    }, []);

    const fetchIngredients = async () => {
        try {
            const response = await instance.get('/get-all-ingredients');
            setIngredients(response.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Toggle safety property
    const toggleSafetyProperty = (property) => {
        setFormData((prev) => ({
            ...prev,
            safety_properties: {
                ...prev.safety_properties,
                [property]: !prev.safety_properties[property],
            },
        }));
    };

    const handleOpenDialog = (ingredient = null) => {
        if (ingredient) {
            setEditMode(true);
            setFormData({
                name: ingredient.name,
                function: ingredient.function,
                description: ingredient.description || '',
                ingredient_id: ingredient.ingredient_id,
                safety_properties: {
                    ...SAFETY_PROPERTIES.reduce(
                        (acc, prop) => ({
                            ...acc,
                            [prop.value]: ingredient[prop.value] || false,
                        }),
                        {},
                    ),
                },
            });
        } else {
            setEditMode(false);
            setFormData({
                name: '',
                function: '',
                description: '',
                ingredient_id: null,
                safety_properties: SAFETY_PROPERTIES.reduce(
                    (acc, prop) => ({
                        ...acc,
                        [prop.value]: false,
                    }),
                    {},
                ),
            });
        }
        setOpenDialog(true);
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                name: formData.name,
                function: formData.function,
                ...formData.safety_properties,
            };

            if (editMode) {
                await instance.put(`/update-ingredient/${formData.ingredient_id}`, payload);
            } else {
                await instance.post('/create-ingredient', payload);
            }

            setOpenDialog(false);
            fetchIngredients();
        } catch (error) {
            console.error('Error submitting ingredient:', error);
        }
    };

    const handleDelete = async (ingredient_id) => {
        if (!window.confirm('Are you sure you want to delete this ingredient?')) return;
        try {
            await instance.delete(`/delete-ingredient/${ingredient_id}`);
            fetchIngredients();
        } catch (error) {
            console.error('Error deleting ingredient:', error);
        }
    };

    // Tạo chuỗi safety information từ các properties được chọn
    const generateSafetyInfo = () => {
        const selectedProperties = SAFETY_PROPERTIES.filter((prop) => formData.safety_properties[prop.value]).map(
            (prop) => prop.label,
        );

        return selectedProperties.join(', ');
    };

    return (
        <div>
            <SubHeader />
            <div className="create-review-wrap">
                <ReviewSidebar />
                <div className="create-review-area">
                    <div className="create-review-content">
                        <h3 className="write-review-title">ADD NEW INGREDIENT</h3>
                        <Button variant="contained" color="primary" onClick={() => handleOpenDialog()}>
                            Add New Ingredient
                        </Button>

                        <h4 className="write-review-title">INGREDIENT TABLE</h4>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <strong>Ingredient Name</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Function</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Safety Information</strong>
                                        </TableCell>
                                        <TableCell>
                                            <strong>Action</strong>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ingredients.map((ingredient) => (
                                        <TableRow key={ingredient.ingredient_id}>
                                            <TableCell>{ingredient.name}</TableCell>
                                            <TableCell>{ingredient.function}</TableCell>
                                            <TableCell>{generateSafetyInfoFromIngredient(ingredient)}</TableCell>
                                            <TableCell>
                                                <BiEditAlt
                                                    className="edit-icon"
                                                    onClick={() => handleOpenDialog(ingredient)}
                                                    style={{ cursor: 'pointer', marginRight: '10px' }}
                                                />
                                                <MdDeleteOutline
                                                    className="delete-icon"
                                                    onClick={() => handleDelete(ingredient.ingredient_id)}
                                                    style={{ cursor: 'pointer', color: 'red' }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
                            <DialogTitle>{editMode ? 'Edit Ingredient' : 'Add New Ingredient'}</DialogTitle>
                            <DialogContent>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Ingredient Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />

                                <TextField
                                    margin="dense"
                                    label="Function"
                                    name="function"
                                    value={formData.function}
                                    onChange={handleChange}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                />

                                <Box sx={{ mt: 2, mb: 2 }}>
                                    <Typography variant="h6" gutterBottom>
                                        Safety Properties
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                        Selected: {generateSafetyInfo()}
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                        {SAFETY_PROPERTIES.map((property) => (
                                            <Chip
                                                key={property.value}
                                                label={property.label}
                                                clickable
                                                variant={
                                                    formData.safety_properties[property.value] ? 'filled' : 'outlined'
                                                }
                                                color={
                                                    formData.safety_properties[property.value] ? 'primary' : 'default'
                                                }
                                                onClick={() => toggleSafetyProperty(property.value)}
                                                sx={{
                                                    fontWeight: 500,
                                                    '&:hover': {
                                                        backgroundColor: 'action.hover',
                                                    },
                                                }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                                <Button onClick={handleSubmit} color="primary" variant="contained">
                                    {editMode ? 'Update' : 'Add'}
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    );
}

function generateSafetyInfoFromIngredient(ingredient) {
    return SAFETY_PROPERTIES.filter((prop) => ingredient[prop.value])
        .map((prop) => prop.label)
        .join(', ');
}

export default AddIngredient;
