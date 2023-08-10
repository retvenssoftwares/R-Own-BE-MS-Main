const { Router } = require('express');
const gethotelname = require('../../controllers/Hotels/getHotelname');
const app = Router();

app.get('/main/getHotelName',gethotelname);
module.exports = app;