const {Router} = require('express');
const gethotelinfo = require('../../controllers/Hotels/getHotelownerinfobyuserid');
const app = Router();

app.get('/main/getHotelInfo/:User_id', gethotelinfo);
module.exports = app;