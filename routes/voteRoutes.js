const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');

const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/vote',userAuthentication.authorizeationToken, voteController.castVote);

module.exports = router;
