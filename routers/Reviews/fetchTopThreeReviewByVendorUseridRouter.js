const { Router } = require('express');
const topreview = require('../../controllers/Reviews/fetchTopThreeReviewByVendorUserid');
const app = Router();
app.get('/main/topReviews/:User_id', topreview);
module.exports = app;