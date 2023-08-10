const { Router } = require('express');
const groupuser = require('../../controllers/User/getSynccontacts');
const app = Router();

app.get('/main/detailsOf/:User_id',groupuser);
module.exports = app;