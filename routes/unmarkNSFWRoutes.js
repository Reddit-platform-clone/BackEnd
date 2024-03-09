const express = require('express');
const router = express.Router();
const unmarkNSFWController = require('../controllers/unmarkNSFWController');

router.post('/api/unmarknsfw', unmarkNSFWController.unmarkNSFW);

module.exports = router;
