const { Router } = require('express');
const getcommunity = require('../../controllers/Community/fetchCommunityList');
const app = Router();
app.get('/main/fetchCommunity/:user_id', getcommunity);
module.exports = app;