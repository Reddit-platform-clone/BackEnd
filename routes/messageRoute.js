const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/api/message/compose',authenticateToken, messageController.compose);
router.get('/api/message/inbox',authenticateToken, messageController.getInboxMessages);
router.get('/api/message/unread',authenticateToken, messageController.getUnreadMessages);
router.delete('/api/message/del_msg',authenticateToken, messageController.deleteMessage);
router.post('/api/report_msg',authenticateToken, messageController.reportMessage);
router.get('/api/message/sent',authenticateToken, messageController.getSentMessages);
router.post('/api/unread_message',authenticateToken, messageController.markMessageUnread);
router.post('/api/read_all_messages',authenticateToken, messageController.markAllMessagesRead);
router.get('/api/get_user_mentions', messageController.getUserMentions);
module.exports = router;
