const moderationService = require('../services/moderationService');

const moderationController = {
    approve: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const postId = req.body.postId;
            const result = await moderationService.approve(communityName, postId);
            res.status(200).json(result);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
    },

    remove: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const postId = req.body.postId;
            const result = await moderationService.remove(communityName, postId);
            res.status(200).json(result);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
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

    inviteUser: async (req, res) => {
        try{
            if (req.user.role != 'member' && req.user.role != 'moderator') {
                res.status(403).json({ message: 'You should be a member of the community to send invitatoins' });
                return;
            }
            const communityName = req.params.subreddit;
            const member = req.user.username;
            const user = req.params.username;

            const result = await moderationService.inviteUser(member, user, communityName);
            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    acceptInvitation: async (req, res) => {
        try {
            if (req.user.role === 'not logged in') {
                res.status(403).json({ message: 'User not logged in' });
                return;
            }
            const username = req.user.username;
            const communityName = req.params.subreddit;

            const result = await moderationService.acceptInvitation(username, communityName);
            res.status(200).json(result);
        } catch (err) {
            res.json(400).status({ message: err.message });
        }
    },

    leaveModerator: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const username = req.user.username;
            const result = await moderationService.leaveModerator(username, communityName);
            res.status(200).json(result);
        } catch(err) {
            res.status(400).json({ message: err.message });
        }
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

    getRecentlyEditedPosts: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getRecentlyEditedPosts(communityName);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
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
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getReported(communityName);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getSpam: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getSpam(communityName);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getRemoved: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getRemoved(communityName);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getModQueue: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getModQueue(communityName);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getUnmoderated: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const result = await moderationService.getUnmoderated(communityName);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    getCommunityLandingPage: async (req, res) => {
        res.status(200).json({ role: req.user.role });
    },

    editCommunity: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const communityData = req.body;
            const result = await moderationService.editCommunity(communityName, communityData);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    ban: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const usernameToBan = req.params.username;
            const result = await moderationService.ban(communityName, usernameToBan);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    unban: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const usernameToUnban = req.params.username;
            const result = await moderationService.unban(communityName, usernameToUnban);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    mute: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const usernameToMute = req.params.username;
            const result = await moderationService.mute(communityName, usernameToMute);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    unmute: async (req, res) => {
        try {
            if (req.user.role != 'moderator') {
                console.log(req.user.role)
                res.status(403).json({ message: 'user is not a moderator' });
                return;
            }
            const communityName = req.params.subreddit;
            const usernameToUnmute = req.params.username;
            const result = await moderationService.unmute(communityName, usernameToUnmute);

            res.status(200).json(result);
        } catch (err) {
            res.status(400).json({ message: err.message })
        }
    },

    respondToInvitation: async (req, res) => {
        try {
            if (req.user.role === 'not logged in') {
                res.status(403).json({ message: 'User not logged in' });
                return;
            }
            const username = req.user.username;
            const communityName = req.params.subreddit;
            let responseDetails = req.body;
            responseDetails.communityName = communityName;

            const result = await moderationService.respondToInvitation(username, responseDetails);
            res.status(200).json(result);
        } catch (err) {
            res.json(400).status({ message: err.message });
        }
    }
};

module.exports = moderationController;