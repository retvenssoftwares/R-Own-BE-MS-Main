const { Router } = require('express');
const saveallid = require('../../controllers/Save/saveAllid');
const app = Router();

app.patch('/main/saveId/:User_id', saveallid);
module.exports = app;