const multer = require('multer');
const { Router } = require('express');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const reviewspost = require('../../controllers/Reviews/HotelPostreview');
const app = Router();
app.post('/main/postHotelReviews', upload.single('quickreview_pic'), reviewspost);
module.exports = app;