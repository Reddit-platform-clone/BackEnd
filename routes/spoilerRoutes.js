const express = require('express');

const router = express.Router();
const spoilerController = require('../controllers/spoilerController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/spoiler', userAuthentication.authorizeationToken,spoilerController.markAsSpoiler);

router.post('/api/unspoiler', userAuthentication.authorizeationToken,spoilerController.unmarkAsSpoiler);

module.exports = router;
