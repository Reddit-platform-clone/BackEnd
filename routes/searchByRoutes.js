const express = require('express');
const router = express.Router();
const searchByController = require('../controllers/searchByController.js');
const userAuthentication = require('../middleware/userAuthMiddleware.js')

router.post('/searchBy/users', searchByController.users);
router.post('/searchBy/posts', searchByController.posts);
router.post('/searchBy/comments', searchByController.comments);
router.post('/searchBy/communities', searchByController.communities);
router.post('/searchBy/hashtags', searchByController.hashtags);
router.post('/searchBy/all', searchByController.all);
module.exports = router;