const Comment = require('../models/commentModel'); 
const Post =require('../models/postModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const UserModel= require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

const postService = {
    getPostReplies: async (postID) => {
       

    try {
      console.log(postID)
      

      const post = await Post.findOne({_id: postID });
      if (!post) {
        
        return { success: false, error:'Post not found.'};
      }
  
      const comments=await Comment.find({postID: postID });
      
      
      if (!comments || comments.length === 0) {
        
        return { success: true, message: [] };
      }
  
      return { success: true, message: comments };
      
    
    }catch (error) {
      console.error('Error get comment:', error);
      return { success: false, error: 'Failed to get comments replies.' };
    }

  },

  hide: async (req, res) => {
    //hide post logic

    return ({ baba: 'baba' })
  },

  createPost: async (postData) => {
    try {
        // Generate a unique post ID using UUID
        const postId = uuidv4();

        // Add the generated post ID and user ID to the post data
        postData.postId = postId;

        // Create a new post object using the updated postData
        const newPost = new Post(postData);

        // Save the new post object to the database
        const savedPost = await newPost.save();

        // Return the saved post object
        return savedPost;
    } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create post");
    }
}
}
module.exports=postService