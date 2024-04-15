const Community = require('../models/communityModel.js');

const joinCommunityService = {
    join: async (username, communityName) => {
        try {
            const community = await Community.findOne(communityName);
            if(!community) {
                throw new Error('Community not found');
            }

            if(!community.members){
                community.members = [];
            }
            community.members.push(username);
            await community.save();
            return {success: true, message: 'User joined community successfully'};
        } catch (error) {
            return {success: false, message: error.message};
        }
    }
};

module.exports = joinCommunityService;