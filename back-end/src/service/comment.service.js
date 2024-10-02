const db = require('../model');
const { Op, where } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Comments = db.Comments;

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const newCommentId = uuidv4();
        const newComment = {
            comment_id: newCommentId,
            comment_text: req.body.comment,
            review_id: req.body.reviewId,
        };
        await Comments.create(newComment);
        res.status(200).send("Create Comment Succeed ");
    } catch (error) {
        console.error('Error creating comment:', error);
        res.status(500).send('Internal Server Error');
    }
};



exports.getCommentByReview = async (req, res) => {
    Comments.findAll({
        where:{
            review_id:req.body.reviewId
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