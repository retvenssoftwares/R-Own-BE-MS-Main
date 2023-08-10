const { Router } = require('express');
const newuser = require('../../controllers/Community/addNewusergroup');
const app = Router();
app.patch('/main/addUser/:group_id', newuser);
module.exports = app;