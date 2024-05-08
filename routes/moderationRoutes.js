const express = require('express');

const router = express.Router();
const moderationController = require('../controllers/moderationController.js');
const authMiddleware = require('../middleware/userAuthMiddleware.js');

router.post(('/r/:subreddit/api/approve'), authMiddleware.checkUserRole, moderationController.approve);
router.post(('/r/:subreddit/api/remove'), authMiddleware.checkUserRole, moderationController.remove);
router.post(('/r/:subreddit/api/invite/:username'), authMiddleware.authorizeationToken, moderationController.inviteToMod);
router.post(('/r/:subreddit/api/accept_moderator_invite'), authMiddleware.authorizeationToken, moderationController.acceptModeratorInvite);
router.post(('/r/:subreddit/api/invite_to_join/:username'), authMiddleware.checkUserRole, moderationController.inviteUser);
router.post(('/r/:subreddit/api/accept_invite_to_join'), authMiddleware.checkUserRole, moderationController.acceptInvitation);
router.post(('/r/:subreddit/api/leavemoderator'), authMiddleware.checkUserRole, moderationController.leaveModerator);
router.post(('/api/site_admin'), authMiddleware.authorizeationToken, moderationController.createCommunity);
router.post(('/r/:subreddit/api/ban/:username'), authMiddleware.checkUserRole, moderationController.ban);
router.delete(('/r/:subreddit/api/unban/:username'), authMiddleware.checkUserRole, moderationController.unban);
router.post(('/r/:subreddit/api/mute/:username'), authMiddleware.checkUserRole, moderationController.mute);
router.delete(('/r/:subreddit/api/unmute/:username'), authMiddleware.checkUserRole, moderationController.unmute);

router.get(('/api/r/:subreddit'), authMiddleware.checkUserRole, moderationController.getCommunityLandingPage);
router.get(('/api/r/:subreddit/about/edited'), authMiddleware.checkUserRole, moderationController.getRecentlyEditedPosts);
router.get(('/api/subreddits/mine/moderator'), authMiddleware.authorizeationToken, moderationController.getModeratedSubreddits);
router.get(('/api/r/:subreddit/about/banned'), authMiddleware.checkUserRole, moderationController.getBannedUsers);
router.get(('/api/r/:subreddit/about/muted'), authMiddleware.checkUserRole, moderationController.getMutedUsers);
router.get(('/api/r/:subreddit/about/moderators'), authMiddleware.checkUserRole, moderationController.getModerators);
router.get(('/api/r/:subreddit/about/reports'), authMiddleware.checkUserRole, moderationController.getReported);
router.get(('/api/r/:subreddit/about/spam'), authMiddleware.checkUserRole, moderationController.getSpam);
router.get(('/api/r/:subreddit/about/removed'), authMiddleware.checkUserRole, moderationController.getRemoved);
router.get(('/api/r/:subreddit/about/modqueue'), authMiddleware.checkUserRole, moderationController.getModQueue);
router.get(('/api/r/:subreddit/about/unmoderated'), authMiddleware.checkUserRole, moderationController.getUnmoderated);
router.patch(('/api/r/:subreddit/edit_community'), authMiddleware.checkUserRole, moderationController.editCommunity);

router.post(('/r/:subreddit/api/respond_to_invitation'), authMiddleware.checkUserRole, moderationController.respondToInvitation);
module.exports = router;