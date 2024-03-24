
const express = require('express');
const router = express.Router();
const subredditController = require('../controllers/subredditController.js');

router.get('/subreddit/getBest', subredditController.getBestPost);
router.get('/hot', subredditController.getHotPost);
router.get('/new', subredditController.getNewPost);
router.get('/top', subredditController.getTopPost);
router.get('/random', subredditController.getRandomPost);
module.exports = router;