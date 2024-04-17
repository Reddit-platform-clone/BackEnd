const express = require('express');

const router = express.Router();
const messageController = require('../controllers/messageController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/message/compose',userAuthentication.authorizeAccess, messageController.compose);
router.get('/api/message/inbox',userAuthentication.authorizeAccess, messageController.getInboxMessages);
router.get('/api/message/unread',userAuthentication.authorizeAccess, messageController.getUnreadMessages);
router.delete('/api/message/del_msg',userAuthentication.authorizeAccess, messageController.deleteMessage);
router.post('/api/report_msg',userAuthentication.authorizeAccess, messageController.reportMessage);
router.get('/api/message/sent',userAuthentication.authorizeAccess, messageController.getSentMessages);
router.post('/api/unread_message',userAuthentication.authorizeAccess, messageController.markMessageUnread);
router.post('/api/read_all_messages',userAuthentication.authorizeAccess, messageController.markAllMessagesRead);
router.get('/api/get_user_mentions', userAuthentication.authorizeAccess,messageController.getUserMentions);
module.exports = router;
