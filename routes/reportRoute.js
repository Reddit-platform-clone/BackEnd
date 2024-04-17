const express = require('express');

const router = express.Router();
const reportController = require('../controllers/reportController');
const userAuthentication = require('../middleware/userAuthMiddleware.js');

router.post('/api/report',userAuthentication.authorizeAccess, reportController.reportThing);

module.exports = router;
