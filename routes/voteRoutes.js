const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

const authenticateToken = require('../middleware/authMiddleware');

router.post('/api/vote',authenticateToken, voteController.castVote);

module.exports = router;
