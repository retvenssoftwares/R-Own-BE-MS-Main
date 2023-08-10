const { Router } = require('express');
const save = require('../../controllers/User/patchsavedpost');
const app = Router();

app.patch('/main/savepost/:user_id', save);
module.exports = app;