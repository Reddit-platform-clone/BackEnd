
const express = require('express');
const router = express.Router();
const subredditController = require('../controllers/subredditController.js');

router.get('/subreddit/getBest', subredditController.getBestPost);
router.get('/subreddit/hot', subredditController.getHotPost);
router.get('/subreddit/new', subredditController.getNewPost);
router.get('/subreddit/top', subredditController.getTopPost);
router.get('/subreddit/random', subredditController.getRandomPost);
module.exports = router;