const express = require('express');
const router = express.Router();
const subredditController = require('../controllers/subredditController'); 
router.get('/r/:subreddit/api/info', subredditController.getSubredditInfo);

module.exports = router;
