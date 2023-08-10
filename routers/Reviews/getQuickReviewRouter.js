const { Router } = require('express');
const review = require('../../controllers/Reviews/getQuickReview');
const app = Router();
app.get('/main/getQuickReview', review);
module.exports = app;