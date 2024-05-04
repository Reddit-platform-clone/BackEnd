const postService = require('../services/postService');
const enrichPostsWithExtras  = require('../services/modifierPostService.js');
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
  getAPost: async (req, res) => {
    try {
  
      let postID=req.body.postID;
     
      const post=await enrichPostsWithExtras([postID]);
      if (post) {
        res.status(200).json({post });
    } else {
        res.status(400).json({ success: false, message: "post doesnt exist"});
    }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve post replies', error: error.message });
    }
  },
};

module.exports = postController;
