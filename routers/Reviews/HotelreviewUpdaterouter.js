const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const updatehotelreview= require('../../controllers/Reviews/Hotelreviewupdate');
const app = Router();

//app.patch('/update/:User_id', upload.single('Profile_pic'), updateprofile);
app.patch('/main/updateHotelReviews/:reviews_id',upload.single('quickreview_pic'), updatehotelreview)
module.exports = app;