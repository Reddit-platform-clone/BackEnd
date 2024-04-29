const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const saveService = {
    savePostOrComment: async (entityId,username,type) => {
      try{  
        if(!entityId){
            return { success: false, error:'entityId is missing.'}; 
        }
        if(!type){
            return { success: false, error:'type is required.'}; 
        }
       if(type==='post'){ 
        postExists=await Post.exists({_id:entityId});
        if(!postExists){
            return { success: false, error:'Post not found.'};
        }
    }
    else if(type==='comment'){ 
        commentExists=await Comment.exists({_id:entityId});
        if(!commentExists){
            return { success: false, error:'comment not found.'};
        }
    }
    else{
        return { success: false, error:'type is not post or comment.'};
    }
        
        user= await UserModel.findOne({username:username});
        
        if(!user){
            return { success: false, error:'User not found.'};
        }
        
        const combinedString = type + "/!" + entityId;
        if( user.savedPosts.includes(combinedString)){
            return { success: false, error:' already saved.'};
        }
       
        await user.savedPosts.push(combinedString);
        await user.save();

    return { success: true, message: ' saved successfully.' };
 
    }catch (error) {
        console.error('Error get message:', error);
        return { success: false, error: 'Failed to save.' };
    }

    },
  
    unsavePostOrComment: async (entityId,username,type) => {
        try{  
            if(!entityId){
                return { success: false, error:'entityId is missing.'}; 
            }
            if(!type){
                return { success: false, error:'type is required.'}; 
            }
           if(type==='post'){ 
            postExists=await Post.exists({_id:entityId});
            if(!postExists){
                return { success: false, error:'Post not found.'};
            }
        }
        else if(type==='comment'){ 
            commentExists=await Comment.exists({_id:entityId});
            if(!commentExists){
                return { success: false, error:'comment not found.'};
            }
        }
        else{
            return { success: false, error:'type is not post or comment.'};
        }
            
            user= await UserModel.findOne({username:username});
            
            if(!user){
                return { success: false, error:'User not found.'};
            }
            
            const combinedString = type + "/!" + entityId;
            if( !user.savedPosts.includes(combinedString)){
                return { success: false, error:' already unsaved.'};
            }
           
            await user.savedPosts.pull(combinedString);
            await user.save();
    
        return { success: true, message: ' unsaved successfully.' };
     
        }catch (error) {
            console.error('Error get message:', error);
            return { success: false, error: 'Failed to save.' };
        }
      },
};
module.exports=saveService