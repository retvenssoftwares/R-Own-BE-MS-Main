const { Router } = require('express');
const job = require('../../controllers/Job/postJob');
const app = Router();
app.post('/main/jobpost/:User_id', job);
module.exports = app;