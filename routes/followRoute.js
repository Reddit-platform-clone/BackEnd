const express = require('express');

const router = express.Router();
const followController = require('../controllers/followController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
router.post('/api/follow_post',userAuthentication.authorizeationToken, followController.followPost);
router.post('/api/unfollow_post',userAuthentication.authorizeationToken, followController.unfollowPost);
module.exports = router;
