const { Router } = require('express');
const fetchsavepost = require('../../controllers/Save/getSavePost');
const app = Router();
app.get('/main/savePost/:user_id', fetchsavepost);
module.exports = app;