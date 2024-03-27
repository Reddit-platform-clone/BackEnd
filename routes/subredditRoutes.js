
const express = require('express');
const router = express.Router();
const subredditController = require('../controllers/subredditController.js');

router.get('/subreddit/getBest', subredditController.getBestPost);
router.get('/subreddit/getHot', subredditController.getHotPost);
router.get('/subreddit/getNew', subredditController.getNewPost);
router.get('/subreddit/getTop', subredditController.getTopPost);
router.get('/subreddit/getRandom', subredditController.getRandomPost);
module.exports = router;