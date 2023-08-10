const { Router } = require('express');
const deletegroup = require('../../controllers/Mesibo/deleteGroupdata')
const app = Router();

app.patch('/main/deleteData', deletegroup);

module.exports = app;