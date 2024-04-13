const Post = require('../models/postModel');
const User = require('../models/userModel');
const { v4: uuidv4 } = require('uuid'); // Import the uuid library

const createPostService = {
    createPost: async (postData, username) => {
        try {
            // Generate a unique post ID using UUID
            const postId = uuidv4();

            // Add the generated post ID and user ID to the post data
            postData.postId = postId;
            postData.userId = username;

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
    },
    getPostById: async (postId) => {
        try {
            // Find the post by its ID
            const post = await Post.findOne({ postId });

            // If the post is not found, return null
            if (!post) {
                
                throw new Error(`Post with ID ${postId} not found`);
            }

            // Return the found post
            return post;
        } catch (error) {
            console.error(`Error fetching post with ID ${postId}:`, error);
            throw new Error("Failed to fetch post");
        }
    }
};

module.exports = createPostService;
