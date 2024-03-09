const express = require('express');
const router = express.Router();
const hidePostController = require('../controllers/hidePostController.js');


router.post('/hidePost/hide', hidePostController.hide);
module.exports = router;