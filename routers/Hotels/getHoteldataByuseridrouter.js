const { Router } = require('express');
const gethotelname = require('../../controllers/Hotels/getHoteldataByuserid');
const app = Router();

app.get('/main/getHotelName/:user_id',gethotelname);
module.exports = app;