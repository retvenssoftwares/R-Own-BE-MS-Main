const { Router } = require('express');
const newadmin = require('../../controllers/Community/pushUseridIntoAdmin');
const app = Router();
app.patch('/main/addUserId/:group_id', newadmin);
module.exports = app;