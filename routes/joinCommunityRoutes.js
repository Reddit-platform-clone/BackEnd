const express = require('express');
const router = express.Router()
const joinCommunityController = require('../controllers/joinComuunityController.js')
const authenticateToken = require('../middleware/authMiddleware.js');

router.post('/api/community/join',authenticateToken, joinCommunityController.joinCommunity);

module.exports = router;