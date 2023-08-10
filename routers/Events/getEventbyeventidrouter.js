const { Router } = require('express');
const getevent = require('../../controllers/Events/getEventbyeventid');
const app = Router();

app.get('/main/fetchEvent/:event_id',getevent);
module.exports = app;