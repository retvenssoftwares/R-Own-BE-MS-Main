const {Router} = require('express');
const gethotelinfo = require('../../controllers/Hotels/gethotelownerpostmedia');
const app = Router();
app.get('/main/getPostMedia/:User_id/:user_id', gethotelinfo);
module.exports = app;