const express = require('express');

const router = express.Router();
const reportController = require('../controllers/reportController');
const authenticateToken = require('../middleware/authMiddleware');

router.post('/api/report',authenticateToken, reportController.reportThing);

module.exports = router;
