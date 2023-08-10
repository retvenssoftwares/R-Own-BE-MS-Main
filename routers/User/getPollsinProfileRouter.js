const { Router } = require('express');
const getPolls = require('../../controllers/User/getPollsinProfile');
const app = Router();
app.get('/main/getPolls/:User_id/:user_id', getPolls);
module.exports = app;