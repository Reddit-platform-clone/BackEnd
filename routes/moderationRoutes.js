const express = require('express');

const router = express.Router();
const moderationController = require('../controllers/moderationController.js');
const authMiddleware = require('../middleware/userAuthMiddleware.js');

router.post(('/api/approve'), moderationController.approve);
router.post(('/api/remove'), moderationController.remove);
router.post(('/api/show_comment'), moderationController.showComment);
router.post(('/r/:subreddit/api/accept_moderator_invite'), moderationController.acceptModeratorInvite);
router.post(('/api/leavemoderator'), moderationController.leaveModerator);
router.post(('/r/:subreddit/api/delete_sr_banner'), moderationController.deleteBanner);
router.post(('/r/:subreddit/api/delete_sr_icon'), moderationController.deleteIcon);
router.post(('/api/site_admin'), authMiddleware.authorizeationToken, moderationController.createCommunity);
router.post(('/r/:subreddit/api/upload_sr_icon'), moderationController.uploadSubredditIcon);

router.get(('/api/r/:subreddit'), authMiddleware.checkUserRole, moderationController.getCommunityLandingPage);
router.get(('/api/r/:subreddit/about/edited'), moderationController.getRecentlyEditedPosts);
router.get(('/api/subreddits/mine/moderator'), moderationController.getModeratedSubreddits);
router.get(('/api/r/:subreddit/about/banned'), moderationController.getBannedUsers);
router.get(('/api/r/:subreddit/about/muted'), moderationController.getMutedUsers);
router.get(('/api/r/:subreddit/about/moderators'), moderationController.getModerators);
router.get(('/api/r/:subreddit/about/reports'), moderationController.getReported);
router.get(('/api/r/:subreddit/about/spam'), moderationController.getSpam);
router.get(('/api/r/:subreddit/about/modqueue'), moderationController.getModQueue);
router.get(('/api/r/:subreddit/about/unmoderated'), moderationController.getUnmoderated);

module.exports = router;