const Community = require('../models/communityModel.js');
const User = require('../models/userModel.js');

const communityService = {
    join: async (username, communityName) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return {success: false, error: 'user not found'};
            }

            const community = await Community.findOne({ communityName: communityName });
            if(!community) {
                throw new Error('Community not found');
            }

            if(!community.members){
                community.members = [];
            }
            community.members.push(username);
            await community.save();

            user.joinedCommunities.push(communityName);
            await user.save();
            return {success: true, message: 'User joined community successfully'};
        } catch (error) {
            return {success: false, message: error.message};
        }
    },

    leave: async (username, communityName) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return { success: false, error: 'User not found' };
            }
    
            const community = await Community.findOne({ communityName: communityName });
            if (!community) {
                throw new Error('Community not found');
            }
    
            if (!community.members || !community.members.includes(username)) {
                return { success: false, error: 'User is not a member of this community' };
            }
    
            // Remove the user from the community's members
            community.members = community.members.filter(member => member !== username);
            await community.save();
    
            // Remove the community from the user's joinedCommunities
            user.joinedCommunities = user.joinedCommunities.filter(community => community !== communityName);
            await user.save();
    
            return { success: true, message: 'User left community successfully' };
        } catch (error) {
            return { success: false, message: error.message };
        }
    },
    
    listCommunities: async () => {
        try {
            const communities = await Community.find();
            return communities;
        } catch (error) {
            console.error('Error fetching communities', error);
            throw new Error('Failed to fetch communities');
        }
    }
};

module.exports = communityService;