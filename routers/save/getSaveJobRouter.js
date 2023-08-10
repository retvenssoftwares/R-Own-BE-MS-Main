const { Router } = require('express');
const fetchsavejob = require('../../controllers/Save/getSaveJob');
const app = Router();
app.get('/main/getSaveJob/:user_id', fetchsavejob);
module.exports = app;