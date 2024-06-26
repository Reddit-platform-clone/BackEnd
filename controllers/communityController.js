const communityService = require('../services/communityService.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv')

dotenv.config()

const communityController = {
    listCommunities: async (req, res) => {
        const category = req.headers['category'];
        try {
            
            const communities = await communityService.listCommunities(category);
            res.json({success: true, data: communities});
        } catch (error) {
            res.status(500).json({success: false, error: error.message})
        }
    },



    communityPosts: async (req, res) => {
        const {subreddit} = req.params
        const username = req.user.username;
        try {
            const result = await communityService.commuintyPosts(subreddit, username);
            if(result.success) {
                res.status(200).json({message: result.message, data: result.data})
            } else {
                res.status(400).json({message: result.message})
            }
        } catch (error) {
            res.status(500).json({error: 'Internal server error'})
        }
    },

    updateCommunityDisplayPic: async (req, res) => {
        try {
            if (!req.files || !req.files.displayPic) {
                return res.status(400).json({message: result.message});
            }

            const {communityName} = req.body;
            console.log(communityName)
            const displayPicFile = req.files.displayPic;
            console.log(displayPicFile)
            const displayPicUpload = await cloudinary.uploader.upload(displayPicFile.tempFilePath);
            const result = await communityService.updateDisplayPic(communityName, displayPicUpload.secure_url)
            console.log(result)
            if(result.success) {
                return res.status(200).json({message: "Updated community display picture successfully"})
            } else {
                return res.status(400).json({message: result.message})
            }
        } catch (error) {
            console.error("Error updating community display pic", error)
            res.status(500).json({error: error.message});
        }
    },

    updateCommunityBackgroundPic: async (req, res) => {
        try {
            if (!req.files || !req.files.backgroundPic) {
                return res.status(400).json({ message: "Background picture not provided" });
            }
    
            const { communityName } = req.body;
            const backgroundPicFile = req.files.backgroundPic;
            const backgroundPicUpload = await cloudinary.uploader.upload(backgroundPicFile.tempFilePath);
            const result = await communityService.updateBackgroundPic(communityName, backgroundPicUpload.secure_url);
    
            if (result.success) {
                return res.status(200).json({ message: "Updated community background picture successfully" });
            } else {
                return res.status(400).json({ message: result.message });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    

    createCommunity: async (req, res) => {
        const communityData = req.body;
        console.log(communityData.communityName)
        let username = req.user;

        if (req.user?.iat) {
            username = req.user.username;
        } else {
            username = req.user;
        }

        try {
            if (!req.files || !req.files.displayPic) {
                console.log('Community display picture not set');
                communityData.displayPic = process.env.DEFAULT_PIC;
            } else {
                const displayPicFile = req.files.displayPic;
                const displayPicUpload = await cloudinary.uploader.upload(displayPicFile.tempFilePath);
                communityData.displayPic = displayPicUpload.secure_url;
            }

            if(!req.files || !req.files.backgroundPic) {
                console.log('Community background pic not set');
                communityData.backgroundPic = process.env.DEFAULT_BACKGROUND;
            } else {
                const backgroundPicFile = req.files.backgroundPic;
                const backgroundPicUpload = await cloudinary.uploader.upload(backgroundPicFile.tempFilePath);
                communityData.backgroundPic = backgroundPicUpload.secure_url;
            }

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

        // console.log(username)
        // console.log(communityName);

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
    },

    listCommunitiesJoined: async (req, res) => {
        const { username } = req.user;
        console.log(username)

        try {
            const communities = await communityService.listCommunitiesJoined(username);
            res.status(200).json({ success: true, data: communities });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getCommunityInfo: async (req, res) => {
        const { postId } = req.params;
        try {
            const result = await communityService.getCommunityInfo(postId)
            if (result.success) {
                return res.status(200).json({ success: true, data: result})
            } else {
                return res.status(400).json({ success: false, message: "Error in getting community info"});
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getCommunityInfoByName: async (req, res) => {
        const { subreddit } = req.params;
        try {
            const result = await communityService.getCommunityInfoByName(subreddit)
            if (result.success) {
                return res.status(200).json({ success: true, data: result})
            } else {
                return res.status(400).json({ success: false, message: "Error in getting community info"});
            }
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getRandomCommunities: async (req, res) => {
        try {
            const randomCommunities = await communityService.getRandomCommunities();
            res.json({success: true, data: randomCommunities});
        } catch (error) {
            res.status(500).json({success: false, error: error.message})
        }
    },

    getTopCommunities: async (req, res) => {
        try {
            const topCommunities = await communityService.getTopCommunities();
            res.json({success: true, data: topCommunities});
        } catch (error) {
            res.status(500).json({success: false, error: error.message})
        }
    }
}

module.exports = communityController;