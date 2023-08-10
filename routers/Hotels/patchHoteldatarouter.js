const { Router } = require('express');
const updateid = require('../../controllers/Hotels/patchHoteldata');
const app = Router();
app.patch('/main/updateHotelData/:hotel_id', updateid);
module.exports = app;