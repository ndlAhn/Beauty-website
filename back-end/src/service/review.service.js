const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Reviews = db.Reviews;

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const reviewId = uuidv4();
        const newReview = {
            review_id: reviewId,
            user_id: req.body.userId,
            title: req.body.title,
            introduction: req.body.introduction,
            packaging: req.body.packaging,
            ingredients: req.body.ingredients,
            uses: req.body.uses,
            target_user: req.body.targetUser,
            review: req.body.review,
            pros: req.body.pros,
            cons: req.body.cons,
            guide: req.body.guide,
            conclusion: req.body.conclusion,
            picture: req.body.picture,
        };

        // await Reviews.create(newReview);
        res.status(200).send({ message: 'Review created successfully', review_id: reviewId });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll({
            where: { user_id: req.body.userId },
            order: [['createdAt', 'DESC']],
        });
        res.status(200).send(reviews);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Reviews.findOne({
            where: { review_id: req.params.reviewId },
        });

        if (!review) {
            return res.status(404).send({ message: 'Review not found' });
        }

        res.status(200).send(review);
    } catch (error) {
        console.error('Error retrieving review:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.updateReview = async (req, res) => {
    try {
        const updatedReview = await Reviews.update(req.body, {
            where: { review_id: req.params.reviewId },
        });

        if (updatedReview[0] === 0) {
            return res.status(404).send({ message: 'Review not found or no changes made' });
        }

        res.status(200).send({ message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const deletedReview = await Reviews.destroy({
            where: { review_id: req.params.reviewId },
        });

        if (!deletedReview) {
            return res.status(404).send({ message: 'Review not found' });
        }

        res.status(200).send({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
