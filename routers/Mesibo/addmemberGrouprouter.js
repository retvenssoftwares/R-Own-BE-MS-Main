const { Router } = require('express');
const member = require('../../controllers/Mesibo/addmemberGroup')
const app = Router();

app.post('/main/addMember', member);

module.exports = app;