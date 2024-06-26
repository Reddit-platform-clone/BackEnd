const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/api/message/compose',userAuthentication.authorizeationToken, messageController.compose);
router.get('/api/message/inbox',userAuthentication.authorizeationToken, messageController.getInboxMessages);
router.get('/api/message/unread',userAuthentication.authorizeationToken, messageController.getUnreadMessages);
router.delete('/api/message/del_msg',userAuthentication.authorizeationToken, messageController.deleteMessage);
router.post('/api/report_msg',userAuthentication.authorizeationToken, messageController.reportMessage);
router.get('/api/message/sent',userAuthentication.authorizeationToken, messageController.getSentMessages);
router.post('/api/unread_message',userAuthentication.authorizeationToken, messageController.markMessageUnread);
router.post('/api/read_all_messages',userAuthentication.authorizeationToken, messageController.markAllMessagesRead);
router.get('/api/get_user_mentions', userAuthentication.authorizeationToken,messageController.getUserMentions);

router.post('/api/read_message',authenticateToken, messageController.markMessageRead);

module.exports = router;
