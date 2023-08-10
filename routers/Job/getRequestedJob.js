const { Router } = require('express');
const getRequestedjob = require('../../controllers/Job/getRequestedJob');
const app = Router();
app.get('/main/getrequestedjob', getRequestedjob);
module.exports = app;