const leaveCommunityService = require('../services/leaveCommunityService.js');

const leaveCommunityController = {
    leaveCommunity: async (req, res) => {
        const {communityName} = req.body;

        let username = req.user;

        if (req.user?.iat) {
            username = req.user.username;
        } else {
            username = req.user;
        }

        try {
            const result = await leaveCommunityService.leave(username, communityName);
            if (result.success) {
                return res.status(200).json({message: result.message});
            } else {
                return res.status(400).json({error: result.message});
            } 
        } catch {
            console.error('Error leaving community:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    }
}

module.exports = leaveCommunityController;