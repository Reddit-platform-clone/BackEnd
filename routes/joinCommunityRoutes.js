const express = require('express');
const router = express.Router();
const joinCommunityController = require('../controllers/joinCommunityController.js');


router.post('/joinCommunity/join', joinCommunityController.join);
module.exports = router;