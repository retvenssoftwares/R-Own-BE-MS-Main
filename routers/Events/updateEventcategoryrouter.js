const { Router } = require('express');
const updateeventcategory = require('../../controllers/Events/updateEventcategory');
const app = Router();

app.patch('/main/updateCategory/:category_id',updateeventcategory);
module.exports = app;