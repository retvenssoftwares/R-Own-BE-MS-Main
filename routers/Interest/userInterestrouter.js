
const { Router } = require('express');
const interest = require('../../controllers/Interest/userInterest');
const app = Router();

app.post('/main/interests',interest);
module.exports = app;