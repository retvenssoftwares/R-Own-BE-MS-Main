const { Router } = require('express');
const notify = require('../../controllers/Mesibo/mesiboNotification')
const app = Router();

app.post('/main/notify/:User_id', notify);

module.exports = app;