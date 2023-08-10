const { Router } = require('express');
const group = require('../../controllers/Mesibo/getGroupuser')
const app = Router();

app.get('/main/groupUser', group);

module.exports = app;