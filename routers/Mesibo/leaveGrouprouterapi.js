const { Router } = require('express');
const leavegroupdata = require('../../controllers/Mesibo/leaveGroup')
const app = Router();

app.post('/main/leave', leavegroupdata);

module.exports = app;