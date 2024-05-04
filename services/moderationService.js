const communityModel = require('../models/communityModel.js');
const modqueue = require('../models/modqueueModel.js');

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
        const communityTitle = details.communityName;
        let community = await communityModel.findOne({ communityName: communityTitle });
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

    getModeratedSubreddits: async (username) => {
        // logic to get all subreddits moderated by a moderator
        const moderatedCommunities = await communityModel.find({ moderatorsUsernames: username });
        return moderatedCommunities;
    },

    getBannedUsers: async (communityName) => {
        // logic to get all banned users from a subreddit
        const community = await communityModel.findOne({ communityName: communityName });
        if (!community) throw new Error('Community not found');

        return { bannedUsers: community.banned };
    },

    getMutedUsers: async (communityName) => {
        // logic to get all muted users in a subreddit
        const community = await communityModel.findOne({ communityName: communityName });
        if (!community) throw new Error('Community not found');

        return { mutedUsers: community.muted };
    },

    getModerators: async (communityName) => {
        // logic to get all moderators of a subreddit
        const community = await communityModel.findOne({ communityName: communityName });
        if (!community) throw new Error('Community not found');

        return { moderators: community.moderatorsUsernames };
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
        // get items, that have not yet been approved
    },

    checkIfModerator: async (communityName, username) => {
        const community = await communityModel.findOne({ communityName: communityName });
        if (!community) throw new Error('Community  does not exist')

        if (community.moderatorsUsernames.includes(username)) return 1;
        if (community.members.includes(username)) return 0;
        return -1;
    }
};

module.exports = moderationService;