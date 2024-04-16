const express = require('express');
const router = express.Router();
const leaveCommunityController = require('../controllers/leaveCommunityController.js');
const authenticateToken = require('../middleware/authMiddleware.js');

router.post('/api/community/leave', authenticateToken, leaveCommunityController.leaveCommunity);

module.exports = router;