const joinCommunityService = require('../services/joinCommunityService');

const joinCommunityController = {
    join: async (req, res) => {
        try {
            // Logic to join the community using joinCommunityService
            const userId = req.user.id; // Assuming user ID is retrieved from the request object
            const communityId = req.params.communityId; // Assuming community ID is retrieved from the request parameters
            await joinCommunityService.joinCommunity(userId, communityId);

            // Send a success response
            res.status(200).json({ success: true, message: 'Successfully joined the community.' });
        } catch (error) {
            console.error('Error joining the community:', error);
            // Send an error response
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
};

module.exports = joinCommunityController;
