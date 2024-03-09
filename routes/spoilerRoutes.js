const express = require('express');

const router = express.Router();
const spoilerController = require('../controllers/spoilerController');

router.post('/api/spoiler', spoilerController.markAsSpoiler);

module.exports = router;
