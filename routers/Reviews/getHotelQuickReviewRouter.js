const { Router } = require('express');
const review = require('../../controllers/Reviews/getHotelQuickReview');
const app = Router();
app.get('/main/hotelQuickReview', review);
module.exports = app;