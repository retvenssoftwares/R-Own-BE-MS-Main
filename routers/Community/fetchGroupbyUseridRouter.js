const { Router } = require('express');
const getgroup = require('../../controllers/Community/fetchGroupbyUserid');
const app = Router();
app.get('/main/fetchGroup/:user_id', getgroup);
module.exports = app;