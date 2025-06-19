const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Products = db.Products;
const Ingredient = db.Ingredients;
const ProductIngredient = db.TableOfIngredient;

// 🛠 **Create new product with ingredients**
exports.create = async (req, res) => {
    try {
        const newProductId = uuidv4();

        // Create the product
        const newProduct = {
            product_id: newProductId,
            product_name: req.body.product_name,
            brand: req.body.brand,
            product_type: req.body.product_type,
            acne: req.body.acne || false,
            aging: req.body.aging || false,
            dried: req.body.dried || false,
            oily: req.body.oily || false,
            skin_recovery: req.body.skin_recovery || false,
            skin_type: req.body.skin_type,
            price_range: req.body.price_range,
            capacity: req.body.capacity,
            uses: req.body.uses,
            warning: req.body.warning,
            product_description: req.body.product_description,
            picture: req.body.picture,
        };

        await Products.create(newProduct);

        // Add ingredients if provided
        if (req.body.ingredients && req.body.ingredients.length > 0) {
            const productIngredients = req.body.ingredients.map((ingredient) => ({
                table_of_ingredient_id: uuidv4(),
                product_id: newProductId,
                ingredient_id: ingredient.ingredient_id,
            }));

            await ProductIngredient.bulkCreate(productIngredients);
        }

        res.status(200).json({
            message: 'Product created successfully',
            product_id: newProductId,
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Get all products with their ingredients**
exports.getAll = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: [
                {
                    model: Ingredient,
                    through: { attributes: [] }, // Exclude junction table attributes
                    as: 'ingredients',
                },
            ],
        });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Find products by name with ingredients**
exports.getProductsByName = async (req, res) => {
    try {
        const products = await Products.findAll({
            where: {
                product_name: {
                    [Op.like]: `%${req.body.product_name}%`,
                },
            },
            include: [
                {
                    model: Ingredient,
                    through: { attributes: [] },
                    as: 'ingredients',
                },
            ],
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving product by name:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Get product by ID with ingredients**
exports.getById = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: { product_id: req.params.productId },
            include: [
                {
                    model: Ingredient,
                    through: { attributes: [] },
                    as: 'ingredients',
                },
            ],
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Error retrieving product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Update product and its ingredients**
exports.update = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        // Update product details
        const updatedProduct = {
            product_name: req.body.product_name,
            brand: req.body.brand,
            product_type: req.body.product_type,
            acne: req.body.acne,
            aging: req.body.aging,
            dried: req.body.dried,
            oily: req.body.oily,
            skin_recovery: req.body.skin_recovery,
            skin_type: req.body.skin_type,
            price_range: req.body.price_range,
            capacity: req.body.capacity,
            uses: req.body.uses,
            warning: req.body.warning,
            product_description: req.body.product_description,
            picture: req.body.picture,
        };

        const [updatedCount] = await Products.update(updatedProduct, {
            where: { product_id: req.params.productId },
            transaction,
        });

        if (updatedCount === 0) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update ingredients if provided
        if (req.body.ingredients) {
            // First remove all existing associations
            await ProductIngredient.destroy({
                where: { product_id: req.params.productId },
                transaction,
            });

            // Then add new associations
            if (req.body.ingredients.length > 0) {
                const productIngredients = req.body.ingredients.map((ingredient) => ({
                    product_id: req.params.productId,
                    ingredient_id: ingredient.ingredient_id,
                }));

                await ProductIngredient.bulkCreate(productIngredients, { transaction });
            }
        }

        await transaction.commit();
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        await transaction.rollback();
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Delete product and its ingredient associations**
exports.delete = async (req, res) => {
    const transaction = await db.sequelize.transaction();
    try {
        // First delete all ingredient associations
        await ProductIngredient.destroy({
            where: { product_id: req.params.productId },
            transaction,
        });

        // Then delete the product
        const deletedCount = await Products.destroy({
            where: { product_id: req.params.productId },
            transaction,
        });

        if (deletedCount === 0) {
            await transaction.rollback();
            return res.status(404).json({ message: 'Product not found' });
        }

        await transaction.commit();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        await transaction.rollback();
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Get products by ingredient**
exports.getByIngredient = async (req, res) => {
    try {
        const products = await Products.findAll({
            include: [
                {
                    model: Ingredient,
                    through: { attributes: [] },
                    where: { ingredient_id: req.params.ingredientId },
                    as: 'ingredients',
                },
            ],
        });

        if (products.length === 0) {
            return res.status(404).json({ message: 'No products found with this ingredient' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products by ingredient:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
