
const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController.js');


router.post('/compose', messageController.compose);
router.get('/inbox', messageController.getInboxMessages);
router.get('/unread', messageController.getUnreadMessages);
module.exports = router;
