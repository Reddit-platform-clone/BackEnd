const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const commentService = {
    postComment: async (data) => {
        
        
        const errors = validationResult(data.commentData);
        
       
        if (!errors.isEmpty()) {
            
            return { success: false, errors: errors.array() };
        }
       
       
        const senderExists = await UserModel.exists({ username: data.username });
        
        if (!senderExists) {
      
            return { success: false, error: `Sender  does not exist.` };
        }
        const postExists= await Post.exists({_id:data.commentData.postID});
        
        if (!postExists) {
            
      
            return { success: false, error: `Post  does not exist.` };
        }
       if (data.commentData.replyToID){
        const commentExists= await Comment.exists({_id:data.commentData.replyToID});
        if(!commentExists){
            return { success: false, error: `Comment  does not exist.` };
        }
       }
        
        data.commentData.userID=data.username;
       
        const comment = new Comment(data.commentData);

       commentSave= await comment.save();
    if(commentSave){
        return { success: true, message: 'comment sent successfully.' };

    }
          
    return  { success: false, error: `comment  did not save.` };
        
  

    },
    getCommentReplies: async (commentID) => {
       

        try {
            
      
            const comment = await Comment.findOne({_id: commentID });
            if (!comment) {
             
              return { success: false, error:'Comment not found.'};
            }
        
            const comments=await Comment.find({replyToID: commentID });
            
            
            if (!comments || comments.length === 0) {
              
              return { success: true, message: [] };
            }
        
            return { success: true, message: comments };
           
          
          }catch (error) {
              console.error('Error get message:', error);
              return { success: false, error: 'Failed to get comments replies.' };
          }

    },
};
module.exports=commentService