const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const ReportModel=require('../models/reportModel');
const reportService = {
    reportThing: async (reportedUsername,reason,type,entityId,description, username) => {
      try{  
        let checkerExist =0;
        
       
        user= await UserModel.findOne({username:username});
        
        if(!user){
            return { success: false, error:'User not found.'};
        }
        if(!type || !reason  || !reportedUsername){
            return { success: false, error:'type/reason/reportedUsername cant be null.'};
        }
        reportedUsernamecheck=await UserModel.findOne({username:username});
        if(!reportedUsernamecheck){
            return { success: false, error:'reported Username not found.'};
        }
       if(type== 'post'){ 
        if(!entityId){
            return { success: false, error:'entityId cant be null.'};
        }
        postExists=await Post.exists({_id:entityId});
        if(!postExists){
            return { success: false, error:'Post not found.'};
        }
        checkerExist=1;

}
if(type== 'comment'){ 
    if(!entityId){
        return { success: false, error:'entityId cant be null.'};
    }
    commentExists=await Comment.exists({_id:entityId});
    if(!commentExists){
        return { success: false, error:'Comment not found.'};
    }
    checkerExist=1;

}
if(type=='user'){
    entityId =reportedUsername;
    checkerExist=1;
}
if(checkerExist==1){
    const report = new ReportModel({
        reportedUsername,
        reason,
        type,
        entityId,
        description,
        username
    });

    
    await report.save(); 
    return { success: true, message: 'Thank you for reporting message 4. We will review it soon' };
}
else{
    return { success: false, error:'tpe is not user/comment/post.'};
}
 
    }catch (error) {
        console.error('Error get message:', error);
        return { success: false, error: 'Failed to report .' };
    }

    },
  
    
};
module.exports=reportService