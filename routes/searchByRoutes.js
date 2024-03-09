const express = require('express');
const router = express.Router();
const searchByController = require('../controllers/searchByController.js');


router.get('/searchBy/users', searchByController.users);
router.get('/searchBy/posts', searchByController.posts);
router.get('/searchBy/comments', searchByController.comments);
router.get('/searchBy/communities', searchByController.communities);
router.get('/searchBy/hashtags', searchByController.hashtags);
module.exports = router;