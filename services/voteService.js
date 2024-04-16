const Vote = require('../models/voteModel'); 
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel'); 
const Comment = require('../models/commentModel'); 
const Post = require('../models/postModel'); 
const mongoose = require('mongoose');
//entityId-->username-->rank
const voteService = {
    castVote: async (data) => {
    try {
       let checkUpdate=0; 
       const {rank, type, entityId,username} = data
    //    console.log(rank !== 0 && rank !== 1 && rank !== -1)
       
    //    console.log(!rank)
    //    console.log(typeof rank !== 'number')
       
    
       if (typeof rank === 'undefined' || (rank !== 0 && rank !== 1 && rank !== -1) ||typeof rank !== 'number') {
        return { success: false, error: `rank is wrong(0, 1, -1) and should be number.` };
    }
      if(!type){
        return { success: false, error: `type is missing.` };
      } 
      if(!entityId){
        return { success: false, error: `entityId is missing.` };
      }


      const senderExists = await UserModel.findOne({ username: username });
      
        if (!senderExists) {
            
            return { success: false, error: `username  does not exist.` };
        }
        if(type=='comment'){
            
            let comment= await Comment.findOne({_id:entityId});
             
            if(!comment){
                return { success: false, error: `comment  does not exist.` };
            }
            let vote=await Vote.findOne({ entityId, username, type });
            if(rank == 1)
            {
                if(vote){
                    if(vote.rank==1){
                        return { success: false, error: `user  already upvoted.` };
                    }
                    comment.downVote--;
                    checkUpdate=1;
                    
                }
                comment.upvote++;
                
            }
            else if(rank == -1){
                if(vote){
                    if(vote.rank==-1){
                        return { success: false, error: `user  already downvoted.` };
                    }
                    comment.upvote--;
                    checkUpdate=1;
                }
                comment.downVote++;
            }
            else{
                if(vote){
                    if(vote.rank==-1){
                        comment.downVote--;
                    }
                    if(vote.rank==1){
                        comment.upvote--;
                    }
                    checkUpdate=1;
                    await vote.remove();
                    
                }
                else{
                    return { success: false, error: `user  is not  voted.` };
                }

            }
           
            await comment.save();
            if(checkUpdate==1  && rank !==0){
                console.log("u")
                vote.rank =rank;
                await vote.save();
                checkUpdate=0
            }
            else{
              if(rank !==0) { const newVote= new Vote(data);
                await newVote.save();}
            }

        }
        else if(type=='post'){
            let post= await Post.findOne({_id:entityId});
             
            if(!post){
                return { success: false, error: `post  does not exist.` };
            }
            let vote=await Vote.findOne({ entityId, username, type });
            if(rank == 1)
            {
                if(vote){
                    if(vote.rank==1){
                        return { success: false, error: `user  already upvoted.` };
                    }
                    post.downvotes--;
                    checkUpdate=1;
                    
                }
                post.upvotes++;
                
            }
            else if(rank == -1){
                if(vote){
                    if(vote.rank==-1){
                        return { success: false, error: `user  already downvoted.` };
                    }
                    post.upvotes--;
                    checkUpdate=1;
                }
                post.downvotes++;
            }
            else{
                if(vote){
                    if(vote.rank==-1){
                        post.downvotes--;
                    }
                    if(vote.rank==1){
                        post.upvotes--;
                    }
                    checkUpdate=1;
                    await vote.remove();
                    
                }
                else{
                    return { success: false, error: `user  is not  voted.` };
                }

            }
           
            await post.save();
            if(checkUpdate==1  && rank !==0){
                console.log("u")
                vote.rank =rank;
                await vote.save();
                checkUpdate=0
            }
            else{
              if(rank !==0) { const newVote= new Vote(data);
                await newVote.save();}
            }
        }
        else{
            return { success: false, error: `type  should be comment or post.` };
        }



    return { success: true, message: 'Vote sent successfully.' };
  } catch (error) {
      console.error('Error sending vote:', error);
      return { success: false, error: 'Failed to send vote.' };
  }
  },
}
module.exports = voteService;