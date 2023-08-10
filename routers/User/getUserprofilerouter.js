const { Router } = require('express');
const get = require('../../controllers/User/getUserprofile');
const app = Router();

app.get('/main/profile', get);
module.exports = app;