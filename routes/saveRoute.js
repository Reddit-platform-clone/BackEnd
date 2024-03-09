const express = require('express');

const router = express.Router();
const saveController = require('../controllers/saveController');

router.post('/api/save', saveController.savePostOrComment);

module.exports = router;
