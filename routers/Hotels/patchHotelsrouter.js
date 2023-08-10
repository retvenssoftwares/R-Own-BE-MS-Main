const { Router } = require('express');
const updateid = require('../../controllers/Hotels/patchHotels');
const app = Router();
app.patch('/main/update_id/:User_id', updateid);
module.exports = app;