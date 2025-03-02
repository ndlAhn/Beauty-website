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
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from '@mui/material';
import { BiEditAlt } from 'react-icons/bi';
import { MdDeleteOutline } from 'react-icons/md';

function AddIngredient() {
    const [ingredients, setIngredients] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        function: '',
        safety: '',
        ingredient_id: null, // Dùng để kiểm tra sửa hay thêm mới
    });

    // 🛠 **Lấy danh sách ingredients từ server khi component render**
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

    // 🛠 **Xử lý khi nhập input**
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 🛠 **Mở form modal để thêm mới hoặc chỉnh sửa**
    const handleOpenDialog = (ingredient = null) => {
        if (ingredient) {
            setEditMode(true);
            setFormData({
                name: ingredient.name,
                function: ingredient.function,
                safety: ingredient.safety,
                ingredient_id: ingredient.ingredient_id,
            });
        } else {
            setEditMode(false);
            setFormData({ name: '', function: '', safety: '', ingredient_id: null });
        }
        setOpenDialog(true);
    };

    // 🛠 **Xử lý Submit - Thêm mới hoặc cập nhật ingredient**
    const handleSubmit = async () => {
        try {
            if (editMode) {
                // Cập nhật ingredient
                await instance.put(`/update-ingredient/${formData.ingredient_id}`, formData);
            } else {
                // Thêm mới ingredient
                await instance.post('/create-ingredient', formData);
            }
            setOpenDialog(false);
            fetchIngredients(); // Refresh danh sách sau khi thêm/sửa
        } catch (error) {
            console.error('Error submitting ingredient:', error);
        }
    };

    // 🛠 **Xóa ingredient**
    const handleDelete = async (ingredient_id) => {
        if (!window.confirm('Are you sure you want to delete this ingredient?')) return;
        try {
            await instance.delete(`/delete-ingredient/${ingredient_id}`);
            fetchIngredients();
        } catch (error) {
            console.error('Error deleting ingredient:', error);
        }
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
                                            <TableCell>{ingredient.safety}</TableCell>
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

                        {/* 🛠 Dialog Form (Add/Edit Ingredient) */}
                        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
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
                                />
                                <TextField
                                    margin="dense"
                                    label="Function"
                                    name="function"
                                    value={formData.function}
                                    onChange={handleChange}
                                    fullWidth
                                />
                                <TextField
                                    margin="dense"
                                    label="Safety Information"
                                    name="safety"
                                    select
                                    value={formData.safety}
                                    onChange={handleChange}
                                    fullWidth
                                >
                                    {[
                                        'Non-comedogenic',
                                        'Hypoallergenic',
                                        'Fragrance-free',
                                        'Dermatologically Tested',
                                        'Alcohol-free',
                                        'Sulphate-free',
                                        'Cruelty-free',
                                        'Vegan',
                                        'Safe for Pregnancy',
                                    ].map((option, index) => (
                                        <MenuItem key={index} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => setOpenDialog(false)} color="secondary">
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit} color="primary">
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

export default AddIngredient;
