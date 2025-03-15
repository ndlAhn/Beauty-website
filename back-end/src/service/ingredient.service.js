require('dotenv').config();
const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Ingredients = db.Ingredients;

// 🛠 **Thêm mới ingredient**
exports.create = async (req, res) => {
    try {
        const newIngredientId = uuidv4();
        const newIngredient = {
            ingredient_id: newIngredientId,
            name: req.body.name,
            function: req.body.function,
            safety: req.body.safety,
        };
        console.log(newIngredient);
        await Ingredients.create(newIngredient);
        res.status(201).json({ message: 'Ingredient created successfully' });
    } catch (error) {
        console.error('Error creating ingredient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Lấy danh sách tất cả ingredients**
exports.getAll = async (req, res) => {
    try {
        const ingredients = await Ingredients.findAll({
            attributes: ['ingredient_id', 'name', 'function'],
        });

        res.status(200).json(ingredients);
    } catch (error) {
        console.error('Error retrieving ingredients:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Lấy ingredient theo ID**
exports.getById = async (req, res) => {
    try {
        const ingredient = await Ingredients.findOne({
            where: { ingredient_id: req.params.ingredientId },
        });

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json(ingredient);
    } catch (error) {
        console.error('Error retrieving ingredient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Cập nhật ingredient theo ID**
exports.updateIngredientById = async (req, res) => {
    try {
        const updatedIngredient = await Ingredients.update(req.body, {
            where: { ingredient_id: req.params.ingredientId },
        });

        if (updatedIngredient[0] === 0) {
            return res.status(404).json({ message: 'Ingredient not found or no changes made' });
        }

        res.status(200).json({ message: 'Ingredient updated successfully' });
    } catch (error) {
        console.error('Error updating ingredient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Xóa ingredient theo ID**
exports.deleteIngredientById = async (req, res) => {
    try {
        const deletedIngredient = await Ingredients.destroy({
            where: { ingredient_id: req.params.ingredientId },
        });

        if (!deletedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json({ message: 'Ingredient deleted successfully' });
    } catch (error) {
        console.error('Error deleting ingredient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getIngredientByName = async (req, res) => {
    try {
        const { name } = req.params; // Lấy giá trị từ query parameters

        if (!name) {
            return res.status(400).json({ message: 'Name parameter is required' });
        }

        const ingredient = await Ingredients.findAll({
            where: {
                name: {
                    [Op.like]: `%${name.toLowerCase()}%`, // Chuyển đổi về chữ thường
                },
            },
        });

        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.status(200).json(ingredient);
    } catch (error) {
        console.error('Error finding ingredient by name:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
