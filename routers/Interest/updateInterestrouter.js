const { Router } = require('express');
const update = require('../../controllers/Interest/updateInterest');
const app = Router();

app.patch('/main/updateInt/:id', update);
module.exports = app;