const { Router } = require('express');
const getgroup = require('../../controllers/Community/getGroupbycreatorid');
const app = Router();
app.get('/main/getGroupById/:creatorID', getgroup);
module.exports = app;