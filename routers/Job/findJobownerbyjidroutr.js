const { Router } = require('express');
const getconnection = require('../../controllers/Job/findJobownerbyjid');
const app = Router();
app.get('/main/fetchownerjob/:user_id', getconnection);
module.exports = app;