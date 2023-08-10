const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const updatereview= require('../../controllers/Reviews/updatePostReview');
const app = Router();

//app.patch('/update/:User_id', upload.single('Profile_pic'), updateprofile);
app.patch('/main/updateReview/:reviews_id',upload.single('quickReviewImage'), updatereview)
module.exports = app;