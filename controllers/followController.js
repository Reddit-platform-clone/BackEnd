followService=require('../services/followService');

const followController = {

  followPost: async (req, res) => {
   
      try {
      
        const {postId} = req.body;
 
          let username =req.user;
          
          if (req.user?.iat){
            username=req.user.username;
          }
      else{
        username=req.user;
      }

        const result=await followService.followPost(postId, username );
        
        if (result.success) {
        
        res.status(200).json({ message: 'post follow successfully.' });
      } else {
        res.status(400).json({ errors: result.errors, message: result.error });
    }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to follow post', error: error.message });
    }
  },
  unfollowPost: async (req, res) => {
    try {
      
      const {postId} = req.body;

        let username =req.user;
        
        if (req.user?.iat){
          username=req.user.username;
        }
    else{
      username=req.user;
    }

      const result=await followService.unfollowPost(postId, username );
      
      if (result.success) {
      
      res.status(200).json({ message: 'post unfollow successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to follow post', error: error.message });
  }
  },
};

module.exports = followController;
