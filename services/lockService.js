const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel'); 
const mongoose = require('mongoose');
const { getReceiverSocketId, io } = require("../utils/WebSockets");
const Post=require('../models/postModel');
const Community=require('../models/communityModel');
const Lock=require('../models/lockModel');
const lockService = {
    lockPost: async (username ,Id) => {
        try {
       
     
        
        if(!Id){
          
           return { success: false, error:' Id is null.'};
        }
        const post = await Post.findOne({_id: Id});
        if (!post) {
           return { success: false, error:'post not found.'};
        }
     
        const community = await Community.findOne({ moderatorsUsernames: { $in: [username] } ,communityName:post.communityId});

    
        
        const user = await UserModel.findOne({ username: username });
        if (!user) {
           return { success: false, error:'User not found.'};
        }
        
        
        if (post.username !== username && !community) {
           return { success: false, error:'You are not authorized to lock this post.'};
        }
        let typeOfUser="owner";
       if(community){
         typeOfUser="mod";
       }
       
      
       if(post.isLocked == true){
        return { success: false, error:'post already lock.'};
    }
        post.isLocked=true
        await post.save();
        Locker= new Lock( {   
            typeOfUser:typeOfUser,
            lockUsername:username,
            entityId:Id});
            Locker.save();
        return { success: true, message: 'locked successfully.' };
        }
          catch (error) {
            console.error('Error  Lock:', error);
            return { success: false, error: 'Error lock:' };
        }
      },


      unlockPost: async (username ,Id) => {
         try {
      
      
         
         if(!Id){
           
            return { success: false, error:' Id is null.'};
         }
         const post = await Post.findOne({_id: Id});
         if (!post) {
            return { success: false, error:'post not found.'};
         }
      
         const community = await Community.findOne({ moderatorsUsernames: { $in: [username] },communityName:post.communityId });
 
     
         
         const user = await UserModel.findOne({ username: username });
         if (!user) {
            return { success: false, error:'User not found.'};
         }
         
         
         if (post.username !== username && !community) {
            return { success: false, error:'You are not authorized to unlock this post.'};
         }

    
        if(post.isLocked == false){
         return { success: false, error:'post already unlocked.'};
     }
    
        let  lock= await Lock.findOne({ lockUsername: username,entityId:Id });
         if(!lock){
            return { success: false, error:'lock doesnt exists.'};

         }
         if(community)
         {
            if(lock.typeOfUser !=="mod" ){
               return { success: false, error:'You are not authorized to lock this post(you are not mod).'};
            }
      
      }
    
         post.isLocked=false
         await post.save();
         await lock.deleteOne({ _id: lock._id });
         
         
         return { success: true, message: 'unlock  successfully.' };
         }
           catch (error) {
             console.error('Error unlock:', error);
             return { success: false, error: 'Error unlock:' };
         }
       },
};

module.exports = lockService;
