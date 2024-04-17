const express = require('express');
const router = express.Router()
const joinCommunityController = require('../controllers/joinComuunityController.js')
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/community/join',userAuthentication.authorizeAccess, joinCommunityController.joinCommunity);

module.exports = router;