const {Router} = require('express');
const gethotel = require('../../controllers/Hotels/getHotelByHotelid');
const app = Router();

app.get('/main/getHotelByHotelId/:hotel_id', gethotel);
module.exports = app;