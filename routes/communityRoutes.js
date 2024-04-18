const express = require('express');
const router = express.Router()
const communityController = require('../controllers/communityController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const { model } = require('mongoose');

router.post('/api/community/join',userAuthentication.authorizeAccess, communityController.joinCommunity);
router.get('/api/community/list', userAuthentication.authorizeAccess, communityController.listCommunities);
router.post('/api/community/leave', userAuthentication.authorizeAccess, communityController.leaveCommunity);

module.exports = router;

