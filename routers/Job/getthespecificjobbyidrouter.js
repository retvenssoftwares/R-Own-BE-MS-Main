const { Router } = require('express');
const data = require('../../controllers/Job/getthespecificjobbyid');
const app = Router();
app.get('/main/getspecificjob/:jid', data);
module.exports = app;