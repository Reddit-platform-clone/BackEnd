const joinCommunityService = require('../services/joinCommunityService.js');

const joinCommunityController = {
    joinCommunity: async (req, res) => {
        const {username, community} = req.body;
        try{
            const result = await joinCommunityService.join(username, community);
            if(result.success) {
                return res.status(200).json({message: result.message});
            } else {
                return res.status(400).json({error: result.message});
            }
        } catch (error) {
            console.error('Error joining community:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = joinCommunityController;