const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel'); 
const mongoose = require('mongoose');
const { getReceiverSocketId, io } = require("../utils/WebSockets");
const Post=require('../models/postModel');
const Community=require('../models/communityModel');
const NSFW=require('../models/nsfwModel');
const nsfwService = {
    markNsfwModPosts: async (username ,Id) => {
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
           return { success: false, error:'You are not authorized to mark this post.'};
        }
        let typeOfUser="owner";
       if(community){
         typeOfUser="mod";
       }
       
       
       if(post.nsfw == true){
        return { success: false, error:'post already nsfw.'};
    }
        post.nsfw=true
        await post.save();
        let Nsfw= new NSFW( {   
         typeOfUser:typeOfUser,
         NsfwUsername:username,
         entityId:Id});
         Nsfw.save();
        return { success: true, message: 'Nsfw marked successfully.' };
        }
          catch (error) {
            console.error('Error markeing NSFW:', error);
            return { success: false, error: 'Error markeing NSFW:' };
        }
      },


      unmarkNsfwModPosts: async (username ,Id) => {
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
            return { success: false, error:'You are not authorized to unmark this post.'};
         }

    
        if(post.nsfw == false){
         return { success: false, error:'post already unmarked.'};
     }
        let  Nsfw= await NSFW.findOne({ NsfwUsername: username });
         if(!Nsfw){
            return { success: false, error:'NSFW doesnt exists.'};

         }
         if(community)
         {
            if(Nsfw.typeOfUser !=="mod" ){
               return { success: false, error:'You are not authorized to unmark this post(you are not mod).'};
            }
      
      }
    
         post.nsfw=false
         await post.save();
         await NSFW.deleteOne({ _id: Nsfw._id });
         
         
         return { success: true, message: 'Nsfw marked successfully.' };
         }
           catch (error) {
             console.error('Error markeing NSFW:', error);
             return { success: false, error: 'Error markeing NSFW:' };
         }
       },
};

module.exports = nsfwService;
