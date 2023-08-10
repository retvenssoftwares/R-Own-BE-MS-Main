const { Router } = require('express');
const getpendreqs = require('../../controllers/User/getPendingRequests');
const app = Router();
app.get('/main/getPendingRequests/:User_id', getpendreqs);
module.exports = app;