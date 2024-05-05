const express = require('express');
const router = express.Router()
const bodyParser = require('body-parser')
const communityController = require('../controllers/communityController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const upload = require('../middleware/uploadMiddleware.js');

router.use(bodyParser.json());

router.post('/api/community/join',userAuthentication.authorizeationToken, communityController.joinCommunity);
router.post('/api/community/leave', userAuthentication.authorizeationToken, communityController.leaveCommunity);
//router.post('/api/community/create', upload.fields([{name: 'displayPic', maxCount: 1}, {name: 'backgroundPic', maxCount: 1}]), userAuthentication.authorizeationToken, communityController.createCommunity);
router.post('/api/community/create', userAuthentication.authorizeationToken, communityController.createCommunity);
router.post('/api/community/updateDisplayPic', userAuthentication.authorizeationToken,communityController.updateCommunityDisplayPic);
router.post('/api/community/updateBackground', userAuthentication.authorizeationToken, communityController.updateCommunityBackgroundPic);

router.get('/api/community/list', userAuthentication.authorizeationToken, communityController.listCommunities);
router.get('/api/community/:communityName/getPosts', userAuthentication.authorizeationToken, communityController.communityPosts)
router.get('/api/user/:userId/communitiesNotJoined', userAuthentication.authorizeationToken, communityController.listCommunitiesNotJoined);
router.get('/api/user/:username/communitiesJoined', userAuthentication.authorizeationToken, communityController.listCommunitiesJoined);
router.get('/api/community/:postId/getCommunityInfo', communityController.getCommunityInfo);
router.get('/api/community/:communityName/getCommunityInfoByName', communityController.getCommunityInfoByName);
router.get('/api/community/getRandomCommunities', userAuthentication.authorizeationToken, communityController.getRandomCommunities);

module.exports = router;

