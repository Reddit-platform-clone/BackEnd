const express = require('express');

const router = express.Router();
const saveController = require('../controllers/saveController');
const authenticateToken = require('../middleware/authMiddleware');
router.post('/api/save',authenticateToken, saveController.savePostOrComment);
router.post('/api/unsave',authenticateToken, saveController.unsavePostOrComment);

module.exports = router;
