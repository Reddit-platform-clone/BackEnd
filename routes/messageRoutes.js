

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js'); // Import messageController

// Define route for sending private message
router.post('/compose', messageController.compose);


module.exports = router;
