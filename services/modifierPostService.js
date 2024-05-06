const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const  Community=require('../models/communityModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
class PostService {
    static async findPostsByIds(entityIds) {
        return await Post.find({_id: {$in: entityIds}});
    }
}

class CommentService {
    static async countCommentsByPostIds(postIds) {
       
        
        let postIdsString=postIds.map(id => id.toString());
      


        let commentCounts = await Comment.aggregate([
            {
                $match: { postID: { $in: postIdsString.map(id => mongoose.Types.ObjectId(id)) } } 
            },
            {
                $group: {
                    _id: "$postID",
                    count: { $sum: 1 } 
                }
            }
        ]);
        
      

      
       
      
        return commentCounts
    }
}

class CommunityService {
    static async findCommunitiesByPosts(posts) {
        let communityIds = posts.map(post => post.communityId);
        return await Community.find({communityName: {$in: communityIds}});
    }
}

class PostWithExtras {
    constructor(post, numComments, communityPic, communityDesc) {
        Object.assign(this, post);
        this.numberOfComments = numComments || 0;
        this.communityPic = communityPic;
        this.communityDesc = communityDesc || "no description";
    }
}

async function enrichPostsWithExtras(entityIds) {
  
    let posts = await PostService.findPostsByIds(entityIds);
    let postIds = posts.map(post => post._id);

    let comments = await CommentService.countCommentsByPostIds(postIds);
    let commentsMap = new Map(comments.map(({ _id, count }) => [String(_id), count]));
    

    let communities = await CommunityService.findCommunitiesByPosts(posts);
    let communityMap = new Map(communities.map(community => [community.communityName, community]));

    let postsWithExtras = posts.map(post => {
        let numComments = commentsMap.get(String(post._id));
        let community = communityMap.get(post.communityId);
        let communityPic = community ? community.displayPic : null;
        let communityDesc = community ? community.description : null;
        
        return new PostWithExtras(post.toObject(), numComments, communityPic, communityDesc);
    });
    

    return postsWithExtras;
}

module.exports = enrichPostsWithExtras