const {Router} = require('express');
const gethotel = require('../../controllers/Hotels/getHotelByownerid');
const app = Router();

app.get('/main/getHotel/:user_id/:User_id', gethotel);
module.exports = app;