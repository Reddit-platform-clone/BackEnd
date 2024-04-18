const communityService = require('../services/communityService.js');

const communityController = {
    listCommunities: async (req, res) => {
        try {
            const communities = await listCommunityService.listCommunities();
            res.json({success: true, data: communities});
        } catch (error) {
            res.status(500).json({succes: false, error: error.message})
        }
    },

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
    },

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

module.exports = communityController;