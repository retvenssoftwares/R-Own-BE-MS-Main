const { Router } = require('express');
const getevent = require('../../controllers/Events/getEventbycategoryid');
const app = Router();
app.get('/main/getEventCategory/:User_id/:category_id', getevent);
module.exports = app;