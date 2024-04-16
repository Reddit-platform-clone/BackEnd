const express = require('express');

const router = express.Router();
const followController = require('../controllers/followController');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/api/follow_post',authenticateToken, followController.followPost);
router.post('/api/unfollow_post',authenticateToken, followController.unfollowPost);
module.exports = router;
