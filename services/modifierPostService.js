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
      


        const commentCounts = await Comment.aggregate([
            {
                $match: { postID: { $in: postIdsString } } 
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
        const communityIds = posts.map(post => post.communityId);
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
    const posts = await PostService.findPostsByIds(entityIds);
    const postIds = posts.map(post => post._id);

    const comments = await CommentService.countCommentsByPostIds(postIds);
    const commentsMap = new Map(comments.map(({ _id, count }) => [String(_id), count]));

    const communities = await CommunityService.findCommunitiesByPosts(posts);
    const communityMap = new Map(communities.map(community => [community.communityName, community]));

    const postsWithExtras = posts.map(post => {
        const numComments = commentsMap.get(String(post._id));
        const community = communityMap.get(post.communityId);
        const communityPic = community ? community.displayPic : null;
        const communityDesc = community ? community.description : null;
        console.log(numComments);
        return new PostWithExtras(post.toObject(), numComments, communityPic, communityDesc);
    });
    

    return postsWithExtras;
}
module.exports = enrichPostsWithExtras