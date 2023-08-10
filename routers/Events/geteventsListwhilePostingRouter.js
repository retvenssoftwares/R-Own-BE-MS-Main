const { Router } = require('express');
const geteventWhilePost = require('../../controllers/Events/geteventsListwhilePosting');
const app = Router();

app.get('/main/getEventPosting/:location',geteventWhilePost);
module.exports = app;