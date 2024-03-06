
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');


router.delete('/api/v1/me/friends/:username', userController.removeFriend);
module.exports = router;
