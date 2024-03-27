const express = require('express');

const router = express.Router();
const hideController = require('../controllers/hideController');

router.post('/api/hide', hideController.hideLink);

module.exports = router;
