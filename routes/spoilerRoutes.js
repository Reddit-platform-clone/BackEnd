const express = require('express');

const router = express.Router();
const spoilerController = require('../controllers/spoilerController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/spoiler', userAuthentication.authorizeAccess,spoilerController.markAsSpoiler);

module.exports = router;
