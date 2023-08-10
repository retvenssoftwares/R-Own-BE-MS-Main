const multer = require('multer');
const { Router } = require('express');
// const upload = multer();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const addreview = require('../../controllers/Reviews/postReviews');
const app = Router();

app.post('/main/review',upload.single('quickReviewImage'), addreview);
module.exports = app;