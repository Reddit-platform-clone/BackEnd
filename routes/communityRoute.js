const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const communityController = require('../controllers/communityController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.use(bodyParser.json());

router.post('/api/community/join',userAuthentication.authorizeationToken, communityController.joinCommunity);
router.get('/api/community/list', userAuthentication.authorizeationToken, communityController.listCommunities);
router.post('/api/community/leave', userAuthentication.authorizeationToken, communityController.leaveCommunity);
router.post('/api/community/create', userAuthentication.authorizeationToken, communityController.createCommunity);
router.get('/api/community/:communityName/getPosts', userAuthentication.authorizeationToken, communityController.communityPosts)
router.get('/api/user/:userId/communitiesNotJoined', userAuthentication.authorizeationToken, communityController.listCommunitiesNotJoined);

module.exports = router;

