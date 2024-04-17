const express = require('express');
const router = express.Router();
const insightsController = require('../controllers/insightsController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js')

router.get('/api/insights_counts', userAuthentication.authorizeAccess,insightsController.getInsightsCounts);

module.exports = router;
