const { Router } = require('express');
const getreview = require('../../controllers/Reviews/getReviewsByVendorUserid');
const app = Router();
app.get('/main/getReviews/:User_id', getreview);
module.exports = app;