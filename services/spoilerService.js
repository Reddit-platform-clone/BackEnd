const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const  Spoiler=require('../models/spoilerModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const Community=require('../models/communityModel');

const spoilerService = {
    spoilerPost: async (entityId,username,type) => {
      try{  
        if(!entityId){
            return { success: false, error:'entityId is missing.'}; 
        }
        if(!type){
            return { success: false, error:'type is required.'}; 
        }
        let typeOfUser="owner";
    
 
       if(type==='post'){ 
        postExists=await Post.findOne({_id:entityId});
        if(!postExists){
            return { success: false, error:'Post not found.'};
        }
        if(postExists.isSpoiler == true){
            return { success: false, error:'Post is already spoiler.'};

        }
        const community = await Community.findOne({ moderatorsUsernames: { $in: [username] } ,communityName:postExists.communityId});
        if (postExists.username !== username && !community) {
            return { success: false, error:'You are not authorized to mark this post.'};
         }
         if(community){
            typeOfUser="mod"
         }
        postExists.isSpoiler = true;
        postExists.save();
    
    
    }
    else if(type==='comment'){ 
        commentExists=await Comment.findOne({_id:entityId});
        if(!commentExists){
            return { success: false, error:'comment not found.'};
        }
        
        if(commentExists.isSpoiler == true){
            return { success: false, error:'Post is already spoiler.'};

        }
        const postcheck=await Comment.findOne({_id:commentExists.postID})
        const community = await Community.findOne({ moderatorsUsernames: { $in: [username] } ,communityName:postcheck.communityId});
        if (commentExists.userID !== username && !community) {
            return { success: false, error:'You are not authorized to mark this comment.'};
         }
         if(community){
            typeOfUser="mod"
         }
        
        commentExists.isSpoiler = true;
        commentExists.save();
    }
    else{
        return { success: false, error:'type is not post or comment.'};
    }
        
    let spoiler= new Spoiler( {   
        typeOfUser:typeOfUser,
        markUsername:username,
        entityId:entityId,
        typeOfEntity:type
    });
        spoiler.save();

    return { success: true, message: ' Spoiler successfully.' };
 
    }catch (error) {
        console.error('Error get spoiler:', error);
        return { success: false, error: 'Failed to spoiler.' };
    }

    },
  
    unspoilerPost: async (entityId,username,type) => {
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
     
};
module.exports=spoilerService