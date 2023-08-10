const { Router } = require('express');
const fetchsaveservice = require('../../controllers/Save/getSaveServices');
const app = Router();
app.get('/main/getSaveService/:user_id', fetchsaveservice);
module.exports = app;