const communityService = require('../services/communityService.js');

const communityController = {
    listCommunities: async (req, res) => {
        try {
            const communities = await communityService.listCommunities();
            res.json({success: true, data: communities});
        } catch (error) {
            res.status(500).json({success: false, error: error.message})
        }
    },

    communityPosts: async (req, res) => {
        const {communityName} = req.params
        console.log(communityName)
        try {
            const result = await communityService.commuintyPosts(communityName);
            if(result.success) {
                res.status(200).json({message: result.message, data: result.data})
            } else {
                res.status(400).json({message: result.message})
            }
        } catch (error) {
            res.status(500).json({error: 'Internal server error'})
        }
    },

    createCommunity: async (req, res) => {
        const communityData = req.body;
        let username = req.user;

        if (req.user?.iat) {
            username = req.user.username;
        } else {
            username = req.user;
        }

        console.log(username);

        try {
            const result = await communityService.create(username, communityData)
            if(result.success) {
                return res.status(200).json({message: result.message})
            } else {
                return res.status(400).json({message: result.message})
            }

        } catch (error) {
            console.error('Error creating community:', error);
            res.status(500).json({error: 'Internal server error'});
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
            const result = await communityService.join(username, communityName);
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
            const result = await communityService.leave(username, communityName);
            if (result.success) {
                return res.status(200).json({message: result.message});
            } else {
                return res.status(400).json({error: result.message});
            } 
        } catch (error){
            console.error('Error leaving community:', error);
            res.status(500).json({error: 'Internal server error'});
        }
    },

    listCommunitiesNotJoined: async (req, res) => {
        const { username } = req.user;
        console.log(username)

        try {
            const communities = await communityService.listCommunitiesNotJoined(username);
            res.status(200).json({ success: true, data: communities });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = communityController;