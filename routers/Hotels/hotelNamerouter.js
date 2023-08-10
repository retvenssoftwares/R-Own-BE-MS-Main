const { Router } = require('express');
const name = require('../../controllers/Hotels/postHotelName');
const app = Router();

app.post('/main/hotelName',name);
module.exports = app;