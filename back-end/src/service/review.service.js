const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Reviews = db.Reviews;
const Users = db.Users; // Thêm truy vấn trực tiếp từ bảng Users

exports.create = async (req, res) => {
    try {
        console.log(req.body);
        const reviewId = uuidv4();
        const newReview = {
            review_id: reviewId,
            user_id: req.body.user_id,
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
            img_path: req.body.picture,
        };

        await Reviews.create(newReview);
        res.status(201).json({ message: 'Review created successfully', review_id: reviewId });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAllReviews = async (req, res) => {
    try {
        // Lấy tất cả reviews
        const reviews = await Reviews.findAll();

        // Lấy danh sách tất cả user_id từ reviews (tránh gọi API từng cái)
        const userIds = reviews.map((review) => review.user_id);

        // Lấy thông tin user từ database
        const users = await Users.findAll({
            where: { user_id: { [Op.in]: userIds } },
            attributes: ['user_id', 'name'],
        });

        // Chuyển đổi users thành object { user_id: name }
        const userMap = users.reduce((acc, user) => {
            acc[user.user_id] = user.name;
            return acc;
        }, {});

        // Gán name cho từng review
        const reviewsWithUserNames = reviews.map((review) => ({
            ...review.toJSON(),
            name: userMap[review.user_id] || 'Unknown', // Nếu không tìm thấy user, trả về 'Unknown'
        }));

        res.status(200).json(reviewsWithUserNames);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const review = await Reviews.findOne({
            where: { review_id: req.params.reviewId },
            include: [
                {
                    model: Users,
                    attributes: ['name'],
                },
            ],
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(review);
    } catch (error) {
        console.error('Error retrieving review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
