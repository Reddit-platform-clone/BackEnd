const express = require('express');

const router = express.Router();
const messageController = require('../controllers/liveMessagesController.js');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/api/message/chat',authenticateToken, messageController.compose);
router.post('/api/message/converstaion',authenticateToken, messageController.getInboxMessages);
router.get('/api/message/getconverstaions',authenticateToken, messageController.getConverstaions);
router.delete('/api/message/del_livmsg',authenticateToken, messageController.deleteMessage);
module.exports = router;
