const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submitController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/submit', userAuthentication.authorizeationToken,submitController.submitLink);

module.exports = router;
