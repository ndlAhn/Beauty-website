const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Products = db.Products;
const Ingredient = db.Ingredients;

// 🛠 **Tạo sản phẩm mới**
exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const newProductId = uuidv4();

        const newProduct = {
            product_id: newProductId,
            product_name: req.body.product_name,
            brand: req.body.brand,
            skin_type: req.body.skin_type,
            skin_problem: req.body.skin_problem,
            product_type: req.body.product_type,
            price_range: req.body.price_range,
            product_description: req.body.description,
            capacity: req.body.capacity,
            uses: req.body.uses,
            warning: req.body.warning,
            picture: req.body.picture,
        };

        await Products.create(newProduct);
        res.status(200).json({ message: 'Product created successfully', product_id: newProductId });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Lấy danh sách tất cả sản phẩm**
exports.getAll = async (req, res) => {
    try {
        const products = await Products.findAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Tìm sản phẩm theo tên**
exports.getProductsByName = async (req, res) => {
    try {
        const products = await Products.findAll({
            where: {
                product_name: {
                    [Op.like]: `%${req.body.product_name}%`, // Tìm kiếm theo tên (dùng LIKE để tìm gần đúng)
                },
            },
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

// 🛠 **Lấy sản phẩm theo ID**
exports.getById = async (req, res) => {
    try {
        const product = await Products.findOne({
            where: { product_id: req.params.productId },
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

// 🛠 **Cập nhật sản phẩm theo ID**
exports.update = async (req, res) => {
    try {
        const updatedProduct = await Products.update(req.body, {
            where: { product_id: req.params.productId },
        });

        if (updatedProduct[0] === 0) {
            return res.status(404).json({ message: 'Product not found or no changes made' });
        }

        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🛠 **Xóa sản phẩm theo ID**
exports.delete = async (req, res) => {
    try {
        const deletedProduct = await Products.destroy({
            where: { product_id: req.params.productId },
        });

        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
