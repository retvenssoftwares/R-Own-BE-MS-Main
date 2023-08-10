const { Router } = require('express');
const getjobbyuserid = require('../../controllers/Job/fetchJobByuserid');
const app = Router();
app.get('/main/job/:user_id', getjobbyuserid);
module.exports = app;