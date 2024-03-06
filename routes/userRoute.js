const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

router.post('/api/block_user', userController.blockUser);

module.exports = router;
