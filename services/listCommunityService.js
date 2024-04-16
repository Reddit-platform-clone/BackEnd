const Community = require('../schemas/communitySchema.js');

const listCommunityService = {
    listCommunities: async () => {
        try {
            const communities = await Community.find();
            return communities;
        } catch (error) {
            console.error('Error fetching communities', error);
            throw new Error('Failed to fetch communities');
        }
    }
}

module.exports = listCommunityService;