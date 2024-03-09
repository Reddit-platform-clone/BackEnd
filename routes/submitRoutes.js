const express = require('express');
const router = express.Router();
const submitController = require('../controllers/submitController');

router.post('/api/submit', submitController.submitLink);

module.exports = router;
