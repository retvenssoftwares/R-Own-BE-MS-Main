const { Router } = require('express');
const hotelreviews = require('../../controllers/Reviews/HotelUserreviews');
const app = Router();
app.patch('/main/addReviewsHotel/:hotel_id', hotelreviews);
module.exports = app;