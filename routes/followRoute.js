const express = require('express');

const router = express.Router();
const followController = require('../controllers/followController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
router.post('/api/follow_post',userAuthentication.authorizeAccess, followController.followPost);
router.post('/api/unfollow_post',userAuthentication.authorizeAccess, followController.unfollowPost);
module.exports = router;
