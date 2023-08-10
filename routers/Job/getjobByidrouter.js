const { Router } = require('express');
const getjob = require('../../controllers/Job/getjobById');
const app = Router();
app.get('/main/getjob/:user_id', getjob);
module.exports = app;