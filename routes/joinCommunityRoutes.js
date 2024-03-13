const express = require('express');
const router = express.Router();
const joinCommunityController = require('../controllers/joinComuunityController');


router.post('/joinCommunity/join', joinCommunityController.join);
module.exports = router;