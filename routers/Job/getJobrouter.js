const { Router } = require('express');
const getjob = require('../../controllers/Job/getJob');
const app = Router();
app.get('/main/getjob/:User_id', getjob);
module.exports = app;