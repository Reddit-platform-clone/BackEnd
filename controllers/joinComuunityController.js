const joinCommunityService = require('../services/joinCommunityService.js');

const joinCommunityController = {
    joinCommunity: async (req, res) => {
        const {communityName} = req.body;
        
        let username = req.user;

        if (req.user?.iat) {
            username = req.user.username;
        } else {
            username = req.user;
        }

        console.log(username)
        console.log(communityName);

        try{
            const result = await joinCommunityService.join(username, communityName);
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