const { Router } = require('express');
const gethotel = require('../../controllers/Hotels/getHotels');
const app = Router();
app.get('/main/getHotel', gethotel);
module.exports = app;