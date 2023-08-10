const { Router } = require('express');
const user = require('../../controllers/Mesibo/mesiboUser');
const app = Router();

app.post('/main/userCreate', user);
module.exports = app;