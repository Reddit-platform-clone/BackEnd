const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const followService = {
    followPost: async (postId,username) => {
      try{  
        
        postExists=await Post.exists({_id:postId});
        if(!postExists){
            return { success: false, error:'Post not found.'};
        }
        
        user= await UserModel.findOne({username:username});
        
        if(!user){
            return { success: false, error:'User not found.'};
        }
        
        if( user.followPosts.includes(postId)){
            return { success: false, error:'post already followed.'};
        }
       
        await user.followPosts.push(postId);
        await user.save();

    return { success: true, message: 'Post follow successfully.' };
 
    }catch (error) {
        console.error('Error get message:', error);
        return { success: false, error: 'Failed to follow post.' };
    }

    },
  
    unfollowPost: async (postId,username) => {
        try{  
        
            postExists=await Post.exists({_id:postId});
            if(!postExists){
                return { success: false, error:'Post not found.'};
            }
            
            user= await UserModel.findOne({username:username});
            
            if(!user){
                return { success: false, error:'User not found.'};
            }
            
            if( !user.followPosts.includes(postId)){
                return { success: false, error:'post already unfollowed.'};
            }
           
            await user.followPosts.pull(postId);
            await user.save();
    
        return { success: true, message: 'Post unfollow successfully.' };
     
        }catch (error) {
            console.error('Error get message:', error);
            return { success: false, error: 'Failed to follow post.' };
        }
      },
};
module.exports=followService