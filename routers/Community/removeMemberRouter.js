const { Router } = require('express');
const newadmin = require('../../controllers/Community/removeMember');
const app = Router();
app.patch('/main/removeMember/:group_id', newadmin);
module.exports = app;