const communityModel = require('../models/communityModel.js');
const modqueue = require('../models/modqueueModel.js');
const userModel = require('../models/userModel.js');
const pushNotificationService = require('./notificationsService.js');

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

    inviteToModeration: async (mod, invitedUser, communityName) => {
        // logic to invite user for moderation
        const community = await communityModel.findOne({ communityName: communityName });
        if (!community) throw new Error('Community does not exist');

        const moderator = await userModel.findOne({ username: mod });
        const invitee = await userModel.findOne({ username: invitedUser });
        if (!moderator || !invitee) throw new Error('User not found');
        if (!community.moderatorsUsernames.includes(mod)) throw new Error('Inviter is not a moderator');
        if (community.moderatorsUsernames.includes(invitedUser)) throw new Error('User is already a moderator');
        if (invitee.modInvitations.includes(communityName)) throw new Error('User already has an invitation pending');

        invitee.modInvitations.push(communityName);
        await invitee.save();
        pushNotificationService.sendPushNotificationToToken(invitee.deviceToken, 'Sarakel', `${mod} invited you to be a moderator in r/${communityName}`);

        return { message: 'invitation sent successfully' }
    },

    acceptModeratorInvite: async (username, communityName) => {
        // logic to accept invitiation to moderate a subreddit
        const community = await communityModel.findOne({ communityName: communityName });
        if (!community) throw new Error('Community does not exist');
        if (community.moderatorsUsernames.includes(username)) throw new Error('User is already a moderator');

        const user = await userModel.findOne({ username: username, modInvitations: communityName });
        if (!user) throw new Error('User does not exist, or not invited to moderate the community');
        
        user.modInvitations.pull(communityName);
        user.joinedCommunities.push(communityName);
        await user.save();

        community.moderatorsUsernames.push(username);
        await community.save();
        
        return { message: `${username} is now a moderator in ${communityName}` }
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