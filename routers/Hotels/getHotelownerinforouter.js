const { Router } = require('express');
const newuser = require('../../controllers/Hotels/getHotelownerinfo');
const app = Router();
app.get('/main/hotelInfo/:User_id/:conn_user_id', newuser);
module.exports = app;