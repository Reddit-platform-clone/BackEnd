const express = require('express');
const router = express.Router();
const leaveCommunityController = require('../controllers/leaveCommunityController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/community/leave', userAuthentication.authorizeAccess, leaveCommunityController.leaveCommunity);

module.exports = router;