
const express = require('express');
const router = express.Router();
const subredditController = require('../controllers/subredditController.js');

router.get('/api/subreddit/getAll', subredditController.getAllPosts);
router.get('/api/subreddit/getBest', subredditController.getBestPost);
router.get('/api/subreddit/getHot', subredditController.getHotPost);
router.get('/api/subreddit/getNew', subredditController.getNewPost);
router.get('/api/subreddit/getTop', subredditController.getTopPost);
router.get('/api/subreddit/getRandom', subredditController.getRandomPost);
module.exports = router;