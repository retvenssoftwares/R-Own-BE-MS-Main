const { Router } = require('express');
const geteventcategory = require('../../controllers/Events/getEventcategory');
const app = Router();

app.get('/main/getEventCategory',geteventcategory);
module.exports = app;