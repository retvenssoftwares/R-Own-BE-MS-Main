const { Router } = require('express');
const get = require('../../controllers/User/getuserbyid');
const app = Router();
app.get('/main/profile/:User_id', get);
module.exports = app;