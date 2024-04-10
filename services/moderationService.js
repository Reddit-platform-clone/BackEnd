const communityModel = require('../models/communityModel.js');

const moderationService = {
    approve: async (id) => {
        // logic to approve link or comment
    },

    remove: async (id) => {
        // logic to remove link, commet or modmail message
    },

    showComment: async (id) => {
        // logic to show collapsed comments
    },

    acceptModeratorInvite: async (subreddit) => {
        // logic to accept invitiation to moderate a subreddit
    },

    leaveModerator: async (id) => {
        // logic to leave moderation role
    },

    deleteBanner: async (subreddit) => {
        // logic to delete subreddit banner
    },

    deleteIcon: async (subreddit) => {
        // logic to delete subreddit icon
    },

    createCommunity: async (creator, details) => {
        // logic to create a subreddit
        const communityTitle = details.title;
        let community = await communityModel.findOne({ title: communityTitle });
        if (community) throw new Error('community title not available');

        community = new communityModel(details);
        await community.moderatorsUsernames.push(creator);
        await community.save();

        return { communityDetails: community };
    },

    uploadSubredditIcon: async (id) => {   // custom
        // logic to upload subreddit icon
    },

    getRecentlyEditedPosts: async (id) => {
        // logic to get recently edited posts
    },

    getModeratedSubreddits: async (id) => {
        // logic to get all subreddits moderated by a moderator
    },

    getBannedUsers: async (id) => {
        // logic to get all banned users from a subreddit
    },

    getMutedUsers: async (id) => {
        // logic to get all muted users in a subreddit
    },

    getModerators: async (id) => {
        // logic to get all moderators of a subreddit
    },

    getReported: async (id) => {
        // logic to get reported items
    },

    getSpam: async (id) => {
        // logic to get items caught by the spam filter
    },

    getModQueue: async (id) => {
        // get items that needs to be reviewed by moderators
    },

    getUnmoderated: async (id) => {
        // get items that have not yet been approved
    }
};

module.exports = moderationService;