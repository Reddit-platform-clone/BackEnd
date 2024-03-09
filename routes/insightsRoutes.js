const express = require('express');
const router = express.Router();
const insightsController = require('../controllers/insightsController');

router.get('/api/insights_counts', insightsController.getInsightsCounts);

module.exports = router;
