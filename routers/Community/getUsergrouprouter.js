const { Router } = require('express');
const get = require('../../controllers/Community/getGroupuser');
const app = Router();
app.get('/main/getGroup', get);
module.exports = app;