const db = require('../model');
const { Op, where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Products = db.Products;

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const newProductId = uuidv4();
        const newUser = {
            product_id: newProductId,
            product_name: req.body.productName,
            brand: req.body.brand,
            skin_type: req.body.skinType,
            skin_problem: req.body.skinProb,
            age_group: req.body.ageGroup,
            product_type:req.body.productType,
            price_range:req.body.priceRange,
            product_description:req.body.description
        };
        await Products.create(newUser);
        res.status(200).send("Create Product Succeed ");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.getAll = async (req, res) => {
    Products.findAll()
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving User.',
            });
        });
};

exports.getProductsByName = async (req, res) => {
    Products.findAll({
        where:{
            product_name:{
                [Op.like]:req.body.productName
            }
        }
    })
        .then((result) => {
            res.status(200).send(result);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving User.',
            });
        });
};



exports.update = async (req,res)=>
{
    try{
        Users.update({
            skin_type:req.body.skinType,
            skin_prob:req.body.skinProb
        },{where:{
            username:req.body.username
        }})
        .then(result=>
        {
            res.status(200).send("Cập nhật thành công")
            

        }
        )
    }
    catch(err)
    {
        console.log(err)
        res.status(500).send("Error due to ",err);
    }
}