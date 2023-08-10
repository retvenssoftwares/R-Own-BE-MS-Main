const { Router } = require('express');
const getuser = require('../../controllers/Mesibo/getMesibouser')
const app = Router();

app.get('/main/users', getuser);

module.exports = app;
