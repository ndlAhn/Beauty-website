const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Products = db.Products;
const Ingredient = db.Ingredients;
const ProductIngredient = db.TableOfIngredient;

// Helper function to validate ingredient IDs exist
const validateIngredientIds = async (ingredientIds) => {
    if (!ingredientIds || ingredientIds.length === 0) return true;

    const ingredients = await Ingredient.findAll({
        where: {
            ingredient_id: {
                [Op.in]: ingredientIds,
            },
        },
    });
    return ingredients.length === ingredientIds.length;
};

// Helper function to get ingredients for multiple products
const getIngredientsForProducts = async (productIds) => {
    const relations = await ProductIngredient.findAll({
        where: {
            product_id: {
                [Op.in]: productIds,
            },
        },
        include: [
            {
                model: Ingredient,
                attributes: [
                    'ingredient_id',
                    'name',
                    'function',
                    'non_comedogenic',
                    'hypoallergenic',
                    'fragrance_free',
                    'dermatologically_tested',
                    'alcohol_free',
                    'sulphate_free',
                    'cruelty_free',
                    'vegan',
                    'safe_for_pregnancy',
                ],
            },
        ],
        raw: true,
        nest: true,
    });

    const ingredientsMap = relations.reduce((acc, curr) => {
        if (!acc[curr.product_id]) {
            acc[curr.product_id] = [];
        }
        if (curr.Ingredient) {
            acc[curr.product_id].push(curr.Ingredient);
        }
        return acc;
    }, {});

    return ingredientsMap;
};

module.exports = {
    // 🛠 Create new product with ingredients
    create: async (req, res) => {
        try {
            // Validate required fields
            const requiredFields = [
                'product_name',
                'brand',
                'product_type',
                'skin_types', // now expects array
                'price_range',
                'capacity',
                'uses',
            ];
            const missingFields = requiredFields.filter(
                (field) => !req.body[field] || (Array.isArray(req.body[field]) && req.body[field].length === 0),
            );

            if (missingFields.length > 0) {
                return res.status(400).json({
                    message: 'Missing required fields',
                    missingFields,
                });
            }

            const newProductId = uuidv4();

            // Prepare product data with proper defaults
            const newProduct = {
                product_id: newProductId,
                product_name: req.body.product_name,
                brand: req.body.brand,
                product_type: req.body.product_type,
                skin_types: req.body.skin_types, // expects array
                price_range: req.body.price_range,
                capacity: req.body.capacity,
                uses: req.body.uses,
                warning: req.body.warning || null,
                product_description: req.body.product_description || null,
                picture: req.body.picture || null,
                // Unified skin problems/goals (from user model)
                acne_prone: req.body.acne_prone ?? false,
                dull_skin: req.body.dull_skin ?? false,
                large_pores: req.body.large_pores ?? false,
                uneven: req.body.uneven ?? false,
                dark_spot: req.body.dark_spot ?? false,
                redness: req.body.redness ?? false,
                dehydrated: req.body.dehydrated ?? false,
                wrinkles: req.body.wrinkles ?? false,
                hydration: req.body.hydration ?? false,
                acne_control: req.body.acne_control ?? false,
                anti_aging: req.body.anti_aging ?? false,
                brightening: req.body.brightening ?? false,
                oil_control: req.body.oil_control ?? false,
                smooth_and_repair: req.body.smooth_and_repair ?? false,
            };

            // Validate ingredients if provided
            if (req.body.ingredients && req.body.ingredients.length > 0) {
                const ingredientIds = req.body.ingredients.map((ingredient) => ingredient.ingredient_id);
                const isValid = await validateIngredientIds(ingredientIds);

                if (!isValid) {
                    return res.status(400).json({ message: 'One or more ingredient IDs are invalid' });
                }
            }

            // Create product and ingredients in a transaction
            await db.sequelize.transaction(async (transaction) => {
                await Products.create(newProduct, { transaction });

                if (req.body.ingredients && req.body.ingredients.length > 0) {
                    const productIngredients = req.body.ingredients.map((ingredient) => ({
                        table_of_ingredient_id: uuidv4(),
                        product_id: newProductId,
                        ingredient_id: ingredient.ingredient_id,
                    }));

                    await ProductIngredient.bulkCreate(productIngredients, { transaction });
                }
            });

            res.status(201).json({
                message: 'Product created successfully',
                product_id: newProductId,
            });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    },

    // 🛠 Get all products with pagination and filtering
    getAll: async (req, res) => {
        try {
            const { page = 1, limit = 10, ...filters } = req.query;
            const offset = (page - 1) * limit;

            // Build filter conditions
            const whereConditions = {};
            for (const [key, value] of Object.entries(filters)) {
                if (value === 'true' || value === 'false') {
                    whereConditions[key] = value === 'true';
                } else if (key === 'skin_types' && value) {
                    // Filter products that have at least one matching skin type
                    whereConditions['skin_types'] = { [Op.contains]: [value] };
                } else if (key === 'price_range') {
                    whereConditions[key] = value;
                } else if (key === 'product_type') {
                    whereConditions[key] = value;
                }
            }

            const { count, rows: products } = await Products.findAndCountAll({
                where: whereConditions,
                limit: parseInt(limit),
                offset: parseInt(offset),
                order: [['createdAt', 'DESC']],
                raw: true,
            });

            // Get ingredients for all products in one query
            const productIds = products.map((p) => p.product_id);
            const ingredientsMap = await getIngredientsForProducts(productIds);

            // Combine products with their ingredients
            const productsWithIngredients = products.map((product) => ({
                ...product,
                ingredients: ingredientsMap[product.product_id] || [],
            }));

            res.status(200).json({
                total: count,
                page: parseInt(page),
                totalPages: Math.ceil(count / limit),
                products: productsWithIngredients,
            });
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    },

    // 🛠 Get products by name (search functionality)
    getProductsByName: async (req, res) => {
        try {
            const { product_name, page = 1, limit = 10 } = req.body;
            const offset = (page - 1) * limit;

            if (!product_name) {
                return res.status(400).json({ message: 'Product name is required' });
            }

            const { count, rows: products } = await Products.findAndCountAll({
                where: {
                    product_name: {
                        [Op.iLike]: `%${product_name}%`,
                    },
                },
                limit: parseInt(limit),
                offset: parseInt(offset),
                raw: true,
            });

            // Get ingredients for found products
            const productIds = products.map((p) => p.product_id);
            const ingredientsMap = await getIngredientsForProducts(productIds);

            const productsWithIngredients = products.map((product) => ({
                ...product,
                ingredients: ingredientsMap[product.product_id] || [],
            }));

            res.status(200).json({
                total: count,
                page: parseInt(page),
                totalPages: Math.ceil(count / limit),
                products: productsWithIngredients,
            });
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    },

    // 🛠 Get product details by ID
    getById: async (req, res) => {
        try {
            const product = await Products.findOne({
                where: { product_id: req.params.productId },
                raw: true,
            });

            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Get ingredients for this product
            const relations = await ProductIngredient.findAll({
                where: { product_id: product.product_id },
                include: [
                    {
                        model: Ingredient,
                        attributes: [
                            'ingredient_id',
                            'name',
                            'function',
                            'non_comedogenic',
                            'hypoallergenic',
                            'fragrance_free',
                            'dermatologically_tested',
                            'alcohol_free',
                            'sulphate_free',
                            'cruelty_free',
                            'vegan',
                            'safe_for_pregnancy',
                        ],
                    },
                ],
                raw: true,
                nest: true,
            });

            const ingredients = relations.map((rel) => rel.Ingredient);

            res.status(200).json({
                ...product,
                ingredients,
            });
        } catch (error) {
            console.error('Error getting product by ID:', error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    },

    // 🛠 Update product
    update: async (req, res) => {
        try {
            // Check if product exists
            const product = await Products.findByPk(req.params.productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }

            // Validate ingredients if provided
            if (req.body.ingredients) {
                const isValid = await validateIngredientIds(req.body.ingredients);
                if (!isValid) {
                    return res.status(400).json({ message: 'One or more ingredient IDs are invalid' });
                }
            }

            await db.sequelize.transaction(async (transaction) => {
                // Update product details
                const updatedProduct = {
                    product_name: req.body.product_name || product.product_name,
                    brand: req.body.brand || product.brand,
                    product_type: req.body.product_type || product.product_type,
                    skin_types: req.body.skin_types || product.skin_types,
                    price_range: req.body.price_range || product.price_range,
                    capacity: req.body.capacity || product.capacity,
                    uses: req.body.uses || product.uses,
                    warning: req.body.warning !== undefined ? req.body.warning : product.warning,
                    product_description:
                        req.body.product_description !== undefined
                            ? req.body.product_description
                            : product.product_description,
                    picture: req.body.picture !== undefined ? req.body.picture : product.picture,
                    // Unified skin problems/goals (from user model)
                    acne_prone: req.body.acne_prone !== undefined ? req.body.acne_prone : product.acne_prone,
                    dull_skin: req.body.dull_skin !== undefined ? req.body.dull_skin : product.dull_skin,
                    large_pores: req.body.large_pores !== undefined ? req.body.large_pores : product.large_pores,
                    uneven: req.body.uneven !== undefined ? req.body.uneven : product.uneven,
                    dark_spot: req.body.dark_spot !== undefined ? req.body.dark_spot : product.dark_spot,
                    redness: req.body.redness !== undefined ? req.body.redness : product.redness,
                    dehydrated: req.body.dehydrated !== undefined ? req.body.dehydrated : product.dehydrated,
                    wrinkles: req.body.wrinkles !== undefined ? req.body.wrinkles : product.wrinkles,
                    hydration: req.body.hydration !== undefined ? req.body.hydration : product.hydration,
                    acne_control: req.body.acne_control !== undefined ? req.body.acne_control : product.acne_control,
                    anti_aging: req.body.anti_aging !== undefined ? req.body.anti_aging : product.anti_aging,
                    brightening: req.body.brightening !== undefined ? req.body.brightening : product.brightening,
                    oil_control: req.body.oil_control !== undefined ? req.body.oil_control : product.oil_control,
                    smooth_and_repair:
                        req.body.smooth_and_repair !== undefined
                            ? req.body.smooth_and_repair
                            : product.smooth_and_repair,
                };

                await Products.update(updatedProduct, {
                    where: { product_id: req.params.productId },
                    transaction,
                });

                // Update ingredients if provided
                if (req.body.ingredients) {
                    // Remove all existing associations
                    await ProductIngredient.destroy({
                        where: { product_id: req.params.productId },
                        transaction,
                    });

                    // Add new associations if any
                    if (req.body.ingredients.length > 0) {
                        const productIngredients = req.body.ingredients.map((ingredient) => ({
                            table_of_ingredient_id: uuidv4(),
                            product_id: req.params.productId,
                            ingredient_id: ingredient.ingredient_id,
                        }));

                        await ProductIngredient.bulkCreate(productIngredients, { transaction });
                    }
                }
            });

            res.status(200).json({ message: 'Product updated successfully' });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    },

    // 🛠 Delete product
    delete: async (req, res) => {
        try {
            await db.sequelize.transaction(async (transaction) => {
                // Check if product exists
                const product = await Products.findByPk(req.params.productId, { transaction });
                if (!product) {
                    return res.status(404).json({ message: 'Product not found' });
                }

                // Delete all ingredient associations
                await ProductIngredient.destroy({
                    where: { product_id: req.params.productId },
                    transaction,
                });

                // Delete the product
                await Products.destroy({
                    where: { product_id: req.params.productId },
                    transaction,
                });
            });

            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
    },
};
