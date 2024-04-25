const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const Mention=require('../models/mentionModel');
const commentService = {
    postComment: async (data) => {
        
        
        const errors = validationResult(data.commentData);
        
       
        if (!errors.isEmpty()) {
            
            return { success: false, errors: errors.array() };
        }
        
       if(data.rr=='reply' && !data.commentData.replyToID){
        return { success: false, error: `replyToID  is missing.` };
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
        
        const mentionRegex = /@(\w+)/g;
        
        const mentions =data.commentData.content.match(mentionRegex);
        const savedmention=[]
        if (mentions) {
            let mentiondata=mentions.map(mention => mention.substring(1));
            
            for (const checkUser of mentiondata){
                const userChecker= await UserModel.findOne({username:checkUser})
                if (userChecker){
                    const mention = new Mention({ mentionedBy:data.username,mentioned:checkUser,type:"comment",entityId:comment._id });
                    
                    mention.save();
                    savedmention.push(checkUser);
                    
                }
            }
            if (savedmention.length === mentiondata.length) {
                return { success: true, message: 'comment sent successfully with mentions.' };
            }
            else{
                return { success: true, message: 'comment sent successfully but some mentioned users do not exist',missingUsers: mentiondata.filter(username => !savedmention.includes(username)) };
            }
            
        }

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
              console.error('Error get comment:', error);
              return { success: false, error: 'Failed to get comments replies.' };
          }

    },
    deleteComment: async (userID,commentId) => {
        try {
        if(!commentId){
           return { success: false, error:'comment Id is null.'};
        }
        const comment = await Comment.findOne({_id: commentId});
        if (!comment) {
           return { success: false, error:'comment not found.'};
        }
    
        
        const user = await UserModel.findOne({ username: userID });
        if (!user) {
           return { success: false, error:'User not found.'};
        }
        if (comment.userID !== user.username) {
           return { success: false, error:'You are not authorized to delete this comment.'};
        }
    
        
        await Comment.findOneAndDelete({_id: commentId});
        return { success: true, message: 'comment deleted successfully' };
      }catch (error) {
          console.error('Error del comment:', error);
          return { success: false, error: 'Failed to del comment.' };
      }
      },
};
module.exports=commentService