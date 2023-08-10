const { Router } = require('express');
const update = require('../../controllers/Interest/pushInterestidinuser');
const app = Router();

app.patch('/main/interestPush/:User_id', update);
module.exports = app;