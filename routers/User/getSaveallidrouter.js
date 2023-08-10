const { Router } = require('express');
const get = require('../../controllers/User/getSaveAllid');
const app = Router();
app.get('/main/saveallid/:User_id', get);
module.exports = app;