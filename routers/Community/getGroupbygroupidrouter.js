const { Router } = require('express');
const getgroup = require('../../controllers/Community/getGroupbyGroupid');
const app = Router();
app.get('/main/getGroup/:group_id', getgroup);
module.exports = app;