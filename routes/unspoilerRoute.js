const express = require('express');

const router = express.Router();
const spoilerController = require('../controllers/unspoilerController');

router.post('/api/unspoiler', spoilerController.markAsUnspoiler);

module.exports = router;
