const express = require('express');
const router = express.Router();
const editController = require('../controllers/editController'); 
router.post('/api/editusertext', editController.editUserText);

module.exports = router;
