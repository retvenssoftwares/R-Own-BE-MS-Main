const { Router } = require('express');
const fetchsaveevent = require('../../controllers/Save/getSaveEvent');
const app = Router();
app.get('/main/getSaveEvent/:user_id', fetchsaveevent);
module.exports = app;