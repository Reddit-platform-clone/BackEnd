const postService = require('../services/postService');

const postController = {

  getPostReplies: async (req, res) => {
    try {
  
      let postID=req.body.postID;
     
      const result=await postService.getPostReplies(postID);
      if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(400).json({ errors: result.errors, message: result.error });
    }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve post replies', error: error.message });
    }
  },

  hide: async (req, res) => {
    try {
    res.json({ success: true, message: 'Hidden successfully' });
    } 
    catch (err) {
        res.status(500).json({  success: false, error: err.message })
    }
   
  },


  createPost: async (req, res) => {
          
    try {
        // Extract post data from the request body
        const postData = req.body;

        // Get the ID of the currently logged-in user
        const userId = req.user.username; // username from the authorization header token

        postData.userId = userId
        // Call the createPost method from the postService to create and add the post to the database
        const newPost = await postService.createPost(postData); // Pass userId as an argument

        // Return the newly created post in the response
        return res.status(201).json(newPost);
    } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
  },


};

module.exports = postController;
