const listCommunityService = require('../services/listCommunityService.js');

const listCommunityController = {
    listCommunities: async (req, res) => {
        try {
            const communities = await listCommunityService.listCommunities();
            res.json({success: true, data: communities});
        } catch (error) {
            res.status(500).json({succes: false, error: error.message})
        }
    }
}

module.exports = listCommunityController;