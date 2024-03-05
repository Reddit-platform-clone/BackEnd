
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');

// Define routes
router.post('/compose', messageController.compose);
router.get('/inbox', messageController.getInboxMessages);

module.exports = router;
