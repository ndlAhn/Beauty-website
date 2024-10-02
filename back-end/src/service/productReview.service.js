const db = require('../model');
const { Op, where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const ProductReviews = db.Product_reviews;

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const reviewId = uuidv4();
        const newProductReviews = {
            review_id: reviewId,
            title: req.body.title,
            img_url: req.body.img,
            pros: req.body.pros,
            cons: req.body.cons,
            description: req.body.description,
            product_id:req.body.productId,
            user_id:req.body.userId,
        };
        await ProductReviews.create(newProductReviews);
        res.status(200).send("Create Product Review Succeed ");
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.getByProductId= async (req, res) => {
    ProductReviews.findAll({
        where:{
            product_id:req.body.productId
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