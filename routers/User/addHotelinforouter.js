const { Router } = require('express');
const updatehotel = require('../../controllers/User/addhospitalityInfo');
const app = Router();
app.patch('/main/addHotelInfo/:user_id', updatehotel);
module.exports = app;