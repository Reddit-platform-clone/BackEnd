const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');


router.post('/api/vote', voteController.castVote);

module.exports = router;
