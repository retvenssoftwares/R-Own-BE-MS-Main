const {Router} = require('express');
const postcount = require('../../controllers/User/getHotelServicePostCount');
const app = Router();

app.get('/main/getcount', postcount);
module.exports = app;