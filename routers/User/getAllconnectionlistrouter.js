const { Router } = require('express');
const getconnection = require('../../controllers/User/getAllconnectionlist');
const app = Router();
app.get('/main/connectionList/:User_id', getconnection);
module.exports = app;