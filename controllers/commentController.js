
const commentService=require('../services/commentService');

const { request } = require('express');
const commentController = {
  postComment: async (req, res) => {
    try {
console.log("CO");
      const commentData=req.body;
      let username =req.user;
      // console.log(req.user.iat);
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }

      const result=await commentService.postComment({commentData,username});

      if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(400).json({ errors: result.errors, message: result.error });
    }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to post comment', error: error.message });
    }
  },
  getCommentReplies: async (req, res) => {
    
    try {
      
      let commentId=req.body.commentId;
     
      const result=await commentService.getCommentReplies(commentId);
      if (result.success) {
        res.status(200).json({ message: result.message });
    } else {
        res.status(400).json({ errors: result.errors, message: result.error });
    }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to retrieve comment replies', error: error.message });
    }
  },
  
  deleteComment: async (req, res) => {
    try {
      if (req.user?.iat){
        username=req.user.username;
      }
  else{
    username=req.user;
  }
      console.log(username);
  commentId=req.body.commentId;

      
      const result=await commentService.deleteComment( username ,commentId);

      if (result.success) {
      res.status(200).json({ message: 'Comment deleted successfully.' });
    } else {
      res.status(400).json({ errors: result.errors, message: result.error });
  }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Failed to delete comment', error: error.message });
    }
  },
};

module.exports = commentController;
