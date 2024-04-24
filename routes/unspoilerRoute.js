const express = require('express');

const router = express.Router();
const spoilerController = require('../controllers/unspoilerController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/unspoiler', userAuthentication.authorizeationToken,spoilerController.markAsUnspoiler);

module.exports = router;
