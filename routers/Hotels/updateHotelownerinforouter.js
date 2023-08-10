const multer = require('multer');
const upload = multer();
const { Router } = require('express');
const hotel = require('../../controllers/Hotels/updateHotelownerinfo');
const app = Router();

app.patch('/main/hotelOwner/:user_id', upload.single('hotelImage'), hotel);
module.exports = app;