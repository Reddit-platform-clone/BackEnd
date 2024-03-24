const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/message/compose',authenticateToken, messageController.compose);
router.get('/message/inbox', messageController.getInboxMessages);
router.get('/message/unread', messageController.getUnreadMessages);
router.delete('/message/del_msg', messageController.deleteMessage);
router.post('/api/report_msg', messageController.reportMessage);
router.get('/message/sent', messageController.getSentMessages);
router.post('/api/unread_message', messageController.markMessageUnread);
router.post('/api/read_all_messages', messageController.markAllMessagesRead);
router.get('/api/get_user_mentions', messageController.getUserMentions);
module.exports = router;
