const { Router } = require('express');
const getevent = require('../../controllers/Events/getAlleventbyuserid');
const app = Router();

app.get('/main/getEvent/:User_id',getevent);
module.exports = app;