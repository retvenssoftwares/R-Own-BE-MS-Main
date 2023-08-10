const { Router } = require('express');
const get = require('../../controllers/User/getProfileCount');
const app = Router();
app.get('/main/count', get);
module.exports = app;