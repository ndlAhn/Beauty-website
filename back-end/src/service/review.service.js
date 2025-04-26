const db = require('../model');
const { Op } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const Reviews = db.Reviews;
const Users = db.Users; // Truy vấn trực tiếp từ bảng Users

// 📝 Tạo review mới
exports.create = async (req, res) => {
    try {
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
        res.status(200).json({ message: 'Review created successfully', review_id: reviewId });
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// 🔍 Lấy tất cả reviews với thông tin user
exports.getAllReviews = async (req, res) => {
    try {
        const reviews = await Reviews.findAll();
        if (!reviews.length) return res.status(200).json([]); // Nếu không có review nào, trả về mảng rỗng

        const userIds = [...new Set(reviews.map((review) => review.user_id))]; // Lọc user_id duy nhất

        // Lấy danh sách user từ database
        const users = await Users.findAll({
            where: { user_id: { [Op.in]: userIds } },
            attributes: ['user_id', 'name'],
        });

        // Map user_id -> name
        const userMap = users.reduce((acc, user) => ({ ...acc, [user.user_id]: user.name }), {});

        // Gán name cho từng review
        const reviewsWithUserNames = reviews.map((review) => ({
            ...review.toJSON(),
            name: userMap[review.user_id] || 'Unknown',
        }));

        res.status(200).json(reviewsWithUserNames);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getReviewById = async (req, res) => {
    try {
        const { reviewId } = req.params;
        if (!reviewId) {
            return res.status(400).json({ message: 'Review ID is required' });
        }

        const review = await Reviews.findOne({
            where: { review_id: reviewId },
            include: [
                {
                    model: Users,
                    attributes: ['name'],
                    required: false,
                },
            ],
        });

        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        const responseData = {
            ...review.dataValues,
        };

        delete responseData.User;

        res.status(200).json(responseData);
    } catch (error) {
        console.error('Error retrieving review:', error);

        // Phân loại lỗi cụ thể hơn
        if (error.name === 'SequelizeDatabaseError') {
            return res.status(500).json({ message: 'Database error' });
        }

        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getReviewByUserId = async (req, res) => {
    try {
        console.log('Get Review ', req.body);
        const reviews = await Reviews.findAll({
            where: { user_id: req.body.user_id },
        });

        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error retrieving reviews:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// ✏️ Cập nhật review theo ID
exports.updateReviewById = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;
        const {
            title,
            introduction,
            packaging,
            ingredients,
            uses,
            target_user,
            review,
            pros,
            cons,
            guide,
            conclusion,
            img_path,
        } = req.body;

        // Kiểm tra xem review có tồn tại không
        const existingReview = await Reviews.findOne({ where: { review_id: reviewId } });
        if (!existingReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Cập nhật review
        await Reviews.update(
            {
                title,
                introduction,
                packaging,
                ingredients,
                uses,
                target_user,
                review,
                pros,
                cons,
                guide,
                conclusion,
                img_path,
            },
            { where: { review_id: reviewId } },
        );

        res.status(200).json({ message: 'Review updated successfully' });
    } catch (error) {
        console.error('Error updating review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// ❌ Xóa review theo ID
exports.deleteReviewById = async (req, res) => {
    try {
        const reviewId = req.params.reviewId;

        // Kiểm tra xem review có tồn tại không
        const review = await Reviews.findOne({ where: { review_id: reviewId } });
        if (!review) {
            return res.status(404).json({ message: 'Review not found' });
        }

        // Xóa review
        await Reviews.destroy({ where: { review_id: reviewId } });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
