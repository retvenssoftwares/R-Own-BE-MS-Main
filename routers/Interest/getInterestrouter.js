const { Router } = require('express');
const get = require('../../controllers/Interest/getInterest');
const app = Router();
app.get('/main/getInterest', get);
module.exports = app;