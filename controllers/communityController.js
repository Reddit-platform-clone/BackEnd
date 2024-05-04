const communityService = require('../services/communityService.js');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded files
const cloudinary = require('cloudinary').v2;


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
        console.log('**********');
        console.log(req.files.displayPic)
        console.log('**********');
        const communityData = req.body;
        console.log(communityData.communityName)
        let username = req.user;

        if (req.user?.iat) {
            username = req.user.username;
        } else {
            username = req.user;
        }

        try {

            const displayPicFile = req.files.displayPic;
            const backgroundPicFile = req.files.backgroundPic;
            console.log(displayPicFile);

            // Upload display picture to Cloudinary
            const displayPicUpload = await cloudinary.uploader.upload(displayPicFile.tempFilePath);
            console.log(displayPicUpload);
            communityData.displayPicUrl = displayPicUpload.secure_url;

            // Upload background picture to Cloudinary
            const backgroundPicUpload = await cloudinary.uploader.upload(backgroundPicFile.tempFilePath);
            communityData.backgroundPicUrl = backgroundPicUpload.secure_url;

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
        const { communityName } = req.params;
        try {
            const result = await communityService.getCommunityInfoByName(communityName)
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
    }
}

module.exports = communityController;