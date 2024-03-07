
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

router.post('/api/block_user', userController.blockUser);
router.post('/api/report_user', userController.reportUser);
router.delete('/api/v1/me/friends/:username', userController.removeFriend);

module.exports = router;
