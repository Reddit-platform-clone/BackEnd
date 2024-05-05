const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');

const editService = {

    editUserText: async (username,data) => {
        
        if(!data.type | !data.entityId){
            return { success: false, errors:'entityId,type cant be empty'};
        }
        
        // if (!errors.isEmpty()) {
           
        //     return { success: false, errors: errors.array() };
        // }
        
        if (data.type != 'comment' && data.type != 'post'){
            
            return { success: false, error: 'type is not comment or post.' };
        }
        
        const senderExists = await UserModel.exists({ username: username });
       
        
        if ( !senderExists) {
          return { success: false, error: 'user does not exist.' };
      } 
      if(data.type === "comment"){
       
        const comment= await  Comment.findOne({  _id:data.entityId });
        if(!comment){
            return { success: false, error: 'comment does not exist.' };
        }
        if(comment.userID !== username ){
            return { success: false, error: 'user  not authorized.' };
        }
        await Comment.updateOne(
            { _id: data.entityId },
            { $set: { content: data.newText } },
            { runValidators: true }
          );
          return { success: true, message: 'Text editted successfully.' };
      
    }
    if(data.type === "post"){
       
        const post= await  Post.findOne({  _id:data.entityId });
        if(!post){
            return { success: false, error: 'post does not exist.' };
        }
        if(post.username !== username ){
            return { success: false, error: 'user  not authorized.' };
        }
        await Post.updateOne(
            { _id: data.entityId },
            { $set: { content: data.newText } },
            { runValidators: true }
          );
          return { success: true, message: 'Text editted successfully.' };
      
    }

    },

};
module.exports=editService