const { Router } = require('express');
const review = require('../../controllers/Reviews/patchReviews');
const app = Router();
app.patch('/main/addReviews/:User_id', review);
module.exports = app;