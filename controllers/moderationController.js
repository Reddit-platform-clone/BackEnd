const userService = require('../services/moderationService');

const moderationController = {
    approve: async (req, res) => {
        res.json({ message: 'approved' })
    },

    remove: async (req, res) => {
        res.json({ message: 'removed' })
    },

    showComment: async (req, res) => {
        res.json({ message: 'shown' })
    },

    acceptModeratorInvite: async (req, res) => {
        res.json({ message: 'accepted' })
    },

    leaveModerator: async (req, res) => {
        res.json({ message: 'left' })
    },

    deleteBanner: async (req, res) => {
        res.json({ message: 'banner deleted' })
    },

    deleteIcon: async (req, res) => {
        res.json({ message: 'icon deleted' })
    },

    createSubreddit: async (req, res) => {
        res.json({ message: 'created' })
    },

    uploadSubredditIcon: async (req, res) => {
        res.json({ message: 'icon uploaded' })
    },

    getRecentlyEditedPosts: async (req, res) => {
        res.json({ message: 'recent edits' })
    },

    getModeratedSubreddits: async (req, res) => {
        res.json({ message: 'moderated subreddits' })
    },

    getBannedUsers: async (req, res) => {
        res.json({ message: 'banned users' })
    },

    getMutedUsers: async (req, res) => {
        res.json({ message: 'muted users' })
    },

    getModerators: async (req, res) => {
        res.json({ message: 'moderators' })
    },

    getReported: async (req, res) => {
        res.json({ message: 'reported' })
    },

    getSpam: async (req, res) => {
        res.json({ message: 'spam' })
    },

    getModQueue: async (req, res) => {
        res.json({ message: 'modqueue' })
    },

    getUnmoderated: async (req, res) => {
        res.json({ message: 'unmoderated' })
    }
};

module.exports = moderationController;