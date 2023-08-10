const { Router } = require('express');
const getRequestedjob = require('../../controllers/Job/getPeopleInJobDetails');
const app = Router();
app.get('/main/getPeopleInjob/:user_id/:company', getRequestedjob);
module.exports = app;