
const express = require('express');
const router = express.Router();
const subredditController = require('../controllers/subredditController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.get('/api/subreddit/getAll', userAuthentication.authorizeationToken,subredditController.getAllPosts);
router.get('/api/subreddit/getBest', userAuthentication.authorizeationToken,subredditController.getBestPost);
router.get('/api/subreddit/getHot', userAuthentication.authorizeAccess,subredditController.getHotPost);
router.get('/api/subreddit/getNew', userAuthentication.authorizeAccess,subredditController.getNewPost);
router.get('/api/subreddit/getTop', userAuthentication.authorizeAccess,subredditController.getTopPost);
router.get('/api/subreddit/getRandom', subredditController.getRandomPost);

module.exports = router;