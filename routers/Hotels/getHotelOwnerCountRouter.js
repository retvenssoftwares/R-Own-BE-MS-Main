const { Router } = require('express');
const gethotelcount = require('../../controllers/Hotels/getHotelOwnerCount');
const app = Router();

app.get('/main/usercount',gethotelcount);
module.exports = app;