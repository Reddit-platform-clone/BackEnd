const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const postService = {
    getPostReplies: async (postID) => {
       

    try {
        console.log(postID)
        
  
        const post = await Post.findOne({_id: postID });
        if (!post) {
         
          return { success: false, error:'Post not found.'};
        }
    
        const comments=await Comment.find({postID: postID });
        
        
        if (!comments || comments.length === 0) {
          
          return { success: true, message: [] };
        }
    
        return { success: true, message: comments };
       
      
      }catch (error) {
          console.error('Error get comment:', error);
          return { success: false, error: 'Failed to get comments replies.' };
      }

},
}
module.exports=postService