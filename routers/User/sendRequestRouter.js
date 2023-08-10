const { Router } = require('express');
const request = require('../../controllers/User/sendRequest');
const app = Router();

app.patch('/main/sendRequest/:User_id', request);
module.exports = app;