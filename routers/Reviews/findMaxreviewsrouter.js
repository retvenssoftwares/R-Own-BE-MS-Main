const { Router } = require('express');
const tophotelreview = require('../../controllers/Reviews/findMaxreviews');
const app = Router();
app.get('/main/topHotelReviews/:hotel_id', tophotelreview);
module.exports = app;