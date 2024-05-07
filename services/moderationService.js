const communityModel = require('../models/communityModel.js');
const modqueueModel = require('../models/modqueueModel.js');
const userModel = require('../models/userModel.js');
const pushNotificationService = require('./notificationsService.js');
const postModel = require('../models/postModel.js');

const moderationService = {
    approve: async (communityName, postId) => {
        // logic to approve posts
        try {
            if (!communityName || !postId) throw new Error('Community name or post id not provided');
            const modqueueItem = await modqueueModel.findOne({ communityName: communityName, entityId: postId });
            if (!modqueueItem) throw new Error ('Post not found');
            modqueueItem.modStatus = 'approved';
            await modqueueItem.save();
            return { success: true, message: 'Post approved' };
        } catch (err) {
            return { error: err.message };
        }
    },

    remove: async (communityName, postId) => {
        // logic to remove posts
        try {
            if (!communityName || !postId) throw new Error('Community name or post id not provided');
            const modqueueItem = await modqueueModel.findOne({ communityName: communityName, entityId: postId });
            if (!modqueueItem) throw new Error ('Post not found');
            modqueueItem.modStatus = 'removed';
            await modqueueItem.save();
            return { success: true, message: 'Post removed' };
        } catch (err) {
            return { error: err.message };
        }
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

    leaveModerator: async (username, commununityName) => {
        // logic to leave moderation role
        try {
            const user = await userModel.findOne({ username: username, joinedCommunities: commununityName });
            if (!user) throw new Error('User not found or not a member');
            
            const community = await communityModel.findOne({ communityName: commununityName });
            if (!community) throw new Error('Community does not exist');
            if (!community.moderatorsUsernames.includes(username)) throw new Error('User is not a moderator');

            community.moderatorsUsernames.pull(username);
            community.members.push(username);
            await community.save();

            return { success: true, message: `${username} is not longer a moderator in ${commununityName}` };
        } catch (err) {
            return { error: err.message };
        }
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

    getRecentlyEditedPosts: async (communityName) => {
        // logic to get recently edited posts
        try {
            const community = await communityModel.find({ communityName: communityName });
            if (!community) throw new Error('Community does not exist');
            const recentlyEditedPosts = await modqueueModel.find({ communityName: communityName, modStatus: 'edited', type: 'post' }).sort({ updatedAt: -1 });
            const postIds = recentlyEditedPosts.map(post => post.entityId.toString());
            const posts = await postModel.find({ _id: { $in: postIds } });
            return { posts: posts };
        } catch (err) {
            return { message: err.message };
        }
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

    getReported: async (communityName) => {
        // logic to get reported items
        try {
            const community = await communityModel.find({ communityName: communityName });
            if (!community) throw new Error('Community does not exist');
            const reportedPosts = await modqueueModel.find({ communityName: communityName, modStatus: 'reported', type: 'post' });
            const postIds = reportedPosts.map(post => post.entityId.toString());
            const posts = await postModel.find({ _id: { $in: postIds } });
            return { posts: posts };
        } catch (err) {
            return { message: err.message };
        }
    },

    getSpam: async (communityName) => {
        // logic to get items caught by the spam filter
        try {
            const community = await communityModel.find({ communityName: communityName });
            if (!community) throw new Error('Community does not exist');
            const spamPosts = await modqueueModel.find({ communityName: communityName, modStatus: 'spam', type: 'post' });
            const postIds = spamPosts.map(post => post.entityId.toString());
            const posts = await postModel.find({ _id: { $in: postIds } });
            return { posts: posts };
        } catch (err) {
            return { message: err.message };
        }
    },

    getRemoved: async (communityName) => {
        // logic to get removed items
        try {
            const community = await communityModel.find({ communityName: communityName });
            if (!community) throw new Error('Community does not exist');
            const removedPosts = await modqueueModel.find({ communityName: communityName, modStatus: 'removed', type: 'post' });
            const postIds = removedPosts.map(post => post.entityId.toString());
            const posts = await postModel.find({ _id: { $in: postIds } });
            return { posts: posts };
        } catch (err) {
            return { message: err.message };
        }
    },

    getModQueue: async (communityName) => {
        // get items that needs to be reviewed by moderators
        try {
            const community = await communityModel.find({ communityName: communityName });
            if (!community) throw new Error('Community does not exist');
            const postsToReview = await modqueueModel.find({ communityName: communityName, modStatus: { $in: ['reported', 'spam'] }, type: 'post' });
            const postIds = postsToReview.map(post => post.entityId.toString());
            const posts = await postModel.find({ _id: { $in: postIds } });
            return { posts: posts };
        } catch (err) {
            return { message: err.message };
        }
    },

    getUnmoderated: async (communityName) => {
        // get items, that have not yet been approved
        try {
            const community = await communityModel.find({ communityName: communityName });
            if (!community) throw new Error('Community does not exist');
            const unmoderatedPosts = await modqueueModel.find({ communityName: communityName, modStatus: 'unmoderated', type: 'post' });
            const postIds = unmoderatedPosts.map(post => post.entityId.toString());
            const posts = await postModel.find({ _id: { $in: postIds } });
            return { posts: posts };
        } catch (err) {
            return { message: err.message };
        }
    },

    checkIfModerator: async (communityName, username) => {
        const community = await communityModel.findOne({ communityName: communityName });
        if (!community) throw new Error('Community  does not exist')

        if (community.moderatorsUsernames.includes(username)) return 1;
        if (community.members.includes(username)) return 0;
        return -1;
    },

    editCommunity: async (communityName, updatedData) => {
        try {
            const community = await communityModel.findOneAndUpdate({ communityName: communityName }, updatedData, { new: true, upsert: true });
            return { updatedCommunityData: community };
        } catch (err) {
            return { message: err.message };
        }
    }
};

module.exports = moderationService;