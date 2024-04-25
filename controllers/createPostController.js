const postService = require('../services/createPostService');

const CreatePostController = {
    createPost: async (req, res) => {
        
        try {

     let username =req.user;
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

      const postData = req.body;
           
            const result = await postService.createPost(postData,username); 
            if (result.success) {
                console.log(result)
                res.status(200).json({ message: result.message });
            } else {
                res.status(400).json({ errors: result.errors, message: result.error });
            }
        } catch (error) {
            console.error('Error composing message:', error);
            res.status(500).json({ error: 'Failed to send message.' });
        }
    }
};

module.exports = CreatePostController;
