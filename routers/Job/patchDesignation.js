const { Router } = require('express');
const patchdesignation = require('../../controllers/Job/patchDesignation');
const app = Router();
app.patch('/main/updatedesignation/:designation_id', patchdesignation);
module.exports = app;