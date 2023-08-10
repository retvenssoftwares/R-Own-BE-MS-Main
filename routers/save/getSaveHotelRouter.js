const { Router } = require('express');
const fetchsavehotel = require('../../controllers/Save/getSaveHotel');
const app = Router();
app.get('/main/getSaveHotel/:user_id', fetchsavehotel);
module.exports = app;