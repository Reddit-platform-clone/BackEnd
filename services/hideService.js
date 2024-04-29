const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const  Community=require('../models/communityModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const enrichPostsWithExtras  = require('./modifierPostService.js');

const hideService = {
    hidePostOrComment: async (entityId,username,type) => {
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
        if( user.hidePosts.includes(combinedString)){
            return { success: false, error:' already hided.'};
        }
       
        await user.hidePosts.push(combinedString);
        await user.save();

    return { success: true, message: ' hide successfully.' };
 
    }catch (error) {
        console.error('Error get message:', error);
        return { success: false, error: 'Failed to hide.' };
    }

    },
  
    unhidePostOrComment: async (entityId,username,type) => {
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
            if( !user.hidePosts.includes(combinedString)){
                return { success: false, error:' already unhide.'};
            }
           
            await user.hidePosts.pull(combinedString);
            await user.save();
    
        return { success: true, message: ' unhide successfully.' };
     
        }catch (error) {
            console.error('Error get message:', error);
            return { success: false, error: 'Failed to save.' };
        }
      },
      get_hide: async (sentUsername) => {
    
        try {
          
        const user = await UserModel.findOne({ username: sentUsername });
        if (!user) {
         
          return { success: false, error:'User not found.'};
        }
        
        
        const combinedStrings = user.hidePosts;
        
       

        let Find=[]
        for(const combinedString of combinedStrings){
            const part=combinedString.split("/!");;
            const type = part[0];
            const entityId = part[1];
            
            if(type == 'post')
            {
                
                
               
                let postWithExtraAttributes=await enrichPostsWithExtras([entityId]);
                
                Find.push(["post", [postWithExtraAttributes]]);
        
            }
            else{
                let comment= await Comment.findOne({_id:entityId});
                Find.push(["comment", [comment]]);

            }
     
        }
        if (!Find || Find.length === 0) {
          
          return { success: true, message: [] };
        }
    
        return { success: true, message: Find };
       
      
      }catch (error) {
          console.error('Error get hidden:', error);
          return { success: false, error: 'Failed to get hidden.' };
      }
      },
};
module.exports=hideService