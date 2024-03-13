const express = require('express');

const router = express.Router();
const reportController = require('../controllers/reportController');

router.post('/api/report/:type/:id', reportController.reportThing);

module.exports = router;
