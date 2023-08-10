
const { Router } = require('express');
const gethotel = require('../../controllers/Hotels/getHotelsWhilePosting');
const app = Router();
app.get('/main/getHotelInPost/:location', gethotel);
module.exports = app;