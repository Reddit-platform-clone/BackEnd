const postService = require('../services/createPostService');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary').v2;

const CreatePostController = {
    createPost: async (req, res) => {
        
        try {
            let username =req.user;
            if (req.user?.iat){
                username=req.user.username;
            }
            else {
                username=req.user;
            }

            const postData = req.body;
            
            if(!req.files || !req.files.media) {
                console.log("Post created has no media");
            } else {
                const mediaFile = req.files.media;
                const mediaFileUpload = await cloudinary.uploader.upload(mediaFile.tempFilePath);
                postData.media = mediaFileUpload.secure_url;
            }

            const result = await postService.createPost(postData,username); 
            if (result.success) {
                console.log(result)
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ errors: result.error, message: result.error });
            }
        } catch (error) {
            console.error('Error composing message:', error);
            res.status(500).json({ error: 'Failed to send message.' });
        }
    }
};

module.exports = CreatePostController;
