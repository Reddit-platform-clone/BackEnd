const express = require('express');

const router = express.Router();
const saveController = require('../controllers/unsaveController');

router.post('/api/unsave', saveController.unsavePostOrComment);

module.exports = router;
