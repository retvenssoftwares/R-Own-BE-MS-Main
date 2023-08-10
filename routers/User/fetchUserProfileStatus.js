const { Router } = require('express');
const fetchstatus = require('../../controllers/User/fetchUserStatusinProfile');
const app = Router();
app.get('/main/getStatus/:User_id/:user_id', fetchstatus);
module.exports = app