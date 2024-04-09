const Post = require('../models/postModel');
const User = require('../models/userModel');

const postService = {
    createPost: async (postData, username) => {
        try {
            // Count the number of existing posts in the database
            const postCount = await Post.countDocuments();

            // Generate a unique post ID based on the post count
            const postId = postCount + 1;

            // Add the generated post ID and user ID to the post data
            postData.post_id = postId;
            postData.user_id = username;

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
    getPostById: async (post_id) => {
        try {
            // Find the post by its ID
            const post = await Post.findById(postId);

            // If the post is not found, return null
            if (!post) {
                
                throw new Error(`Post with ID ${post_id} not found`);
            }

            // Return the found post
            return post;
        } catch (error) {
            console.error(`Error fetching post with ID ${post_id}:`, error);
            throw new Error("Failed to fetch post");
        }
    }
};

module.exports = createpostService;
