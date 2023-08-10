const multer = require('multer');
const { Router } = require('express');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const hotel = require('../../controllers/Hotels/postHoteldata');
const app = Router();

app.post('/main/hotelPost', hotel);
module.exports = app;