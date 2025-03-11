require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./model');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sequelize
    .sync({ alter: true })
    .then(() => console.log('Database synchronized'))
    .catch((err) => console.error('Database sync error:', err));

require('./controller/user.controller')(app);
require('./controller/product.controller')(app);
require('./controller/comment.controller')(app);
require('./controller/productReview.controller')(app);
require('./controller/reviews.controller')(app);
require('./controller/ingredient.controller')(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
