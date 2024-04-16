const Community = require('../models/communityModel.js');
const User = require('../models/userModel.js');

const joinCommunityService = {
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
    }
};

module.exports = joinCommunityService;