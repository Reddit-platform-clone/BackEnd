const express = require('express');
const router = express.Router()
const joinCommunityController = require('../controllers/joinComuunityController.js')

router.post('/community/join', joinCommunityController.joinCommunity);

module.exports = router;