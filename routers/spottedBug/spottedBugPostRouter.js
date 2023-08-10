
const express = require('express');
const router = express.Router();
const { addSpottedBug, uploadHotelFiles } = require('../../controllers/spottedBug/spottedBugPost');

// Route to add spotted bug
router.post('/main/postBug', uploadHotelFiles, addSpottedBug);

module.exports = router;
