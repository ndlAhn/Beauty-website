const express = require('express');
const app = express();
const port = 5000;
const db = require('./model');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

db.sequelize.sync({ alter: true });
require('./controller/user.controller')(app);
require('./controller/product.controller')(app);
require('./controller/comment.controller')(app);
require('./controller/productReview.controller')(app);
require('./controller/reviews.controller')(app);
app.listen(port, () => {
    console.log('Listen on port ', port);
});
