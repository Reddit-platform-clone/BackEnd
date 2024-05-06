const moderationService = require('../services/moderationService');

const moderationController = {
    approve: async (req, res) => {
        res.json({ message: 'approved' })
    },

    remove: async (req, res) => {
        res.json({ message: 'removed' })
    },

    showComment: async (req, res) => {
        res.json({ message: 'shown' })
    },

    inviteToMod: async (req, res) => {
        try {
            const mod = req.user.username;
            const invitee = req.params.username;
            const communityName = req.params.subreddit;

            const result = await moderationService.inviteToModeration(mod, invitee, communityName)
            res.status(200).json(result)
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    acceptModeratorInvite: async (req, res) => {
        try {   
            const username = req.user.username;
            const communityName = req.params.subreddit;
            
            const result = await moderationService.acceptModeratorInvite(username, communityName);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    leaveModerator: async (req, res) => {
        res.json({ message: 'left' })
    },

    deleteBanner: async (req, res) => {
        res.json({ message: 'banner deleted' })
    },

    deleteIcon: async (req, res) => {
        res.json({ message: 'icon deleted' })
    },

    createCommunity: async (req, res) => {
        try {
            const creator = req.user.username;
            const communityDetails = req.body;        

            const result = await moderationService.createCommunity(creator, communityDetails);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).send(err.message);
        }
    },

    uploadSubredditIcon: async (req, res) => {
        res.json({ message: 'icon uploaded' })
    },

    getRecentlyEditedPosts: async (req, res) => {
        res.json({ message: 'recent edits' })
    },

    getModeratedSubreddits: async (req, res) => {
        try {
            const username = req.user.username;
            const result = await moderationService.getModeratedSubreddits(username);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    getBannedUsers: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {    
                res.status(403).json({ message: 'moderator only page' }); 
                return;
            }            
            const communityName = req.params.subreddit;
            const result = await moderationService.getBannedUsers(communityName);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    },

    getMutedUsers: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {    
                res.status(403).json({ message: 'moderator only page' }); 
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getMutedUsers(communityName);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message});
        }
    },

    getModerators: async (req, res) => {
        try {
            if (req.user.role === 'not logged in') {    
                res.status(403).json({ message: 'user has to be logged in' }); 
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getModerators(communityName);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message});
        }

    },

    getReported: async (req, res) => {
        res.json({ message: 'reported' })
    },

    getSpam: async (req, res) => {
        res.json({ message: 'spam' })
    },

    getModQueue: async (req, res) => {
        res.json({ message: 'modqueue' })
    },

    getUnmoderated: async (req, res) => {
        res.json({ message: 'unmoderated' })
    },

    getCommunityLandingPage: async (req, res) => {
        res.status(200).json({ role: req.user.role });
    }
};

module.exports = moderationController;