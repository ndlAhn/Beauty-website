require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./model'); // ✅ Đường dẫn đúng
const communityRoutes = require('./routes/community.routes');
const recommendRoute = require('./routes/recommend.route'); // ✅ Route recommendation

const app = express();
const PORT = process.env.PORT || 3001;

// --- Middleware ---
app.use(
    cors({
        origin: 'http://localhost:3000', // React frontend
        credentials: true,
    })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// --- Database Sync ---
db.sequelize
    .sync({ alter: true })
    .then(() => console.log('✅ Database synchronized'))
    .catch((err) => console.error('❌ Database sync error:', err));

// --- Controller Routes ---
require('./controller/user.controller')(app);
require('./controller/product.controller')(app);
require('./controller/comment.controller')(app);
require('./controller/productReview.controller')(app);
require('./controller/reviews.controller')(app);
require('./controller/ingredient.controller')(app);
require('./controller/follower.controller')(app);

// --- Custom Routes ---
app.use('/community', communityRoutes);
app.use('/api/recommend', recommendRoute); 
// ✅ Đã thêm route recommendation

// --- Start Server ---
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
