const { Router } = require('express');
const fetchhotelreview = require('../../controllers/Reviews/getHotelReviewByHotelid');
const app = Router();
app.get('/main/getHotelReview/:hotel_id', fetchhotelreview);
module.exports = app;