const express = require('express');

const router = express.Router();
const editController = require('../controllers/editController');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/api/editusertext',authenticateToken, editController.editUserText);

module.exports = router;
