const { Router } = require('express');
const newuser = require('../../controllers/User/studentEducationNormaluserHopitality');
const app = Router();
app.patch('/main/addMultiple/:user_id', newuser);
module.exports = app;