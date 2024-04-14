const postService = require('../services/createPostService');

const CreatePostController = {
    createPost: async (req, res) => {
        try {
            // Extract post data from the request body
            const postData = req.body;

            // Get the ID of the currently logged-in user
            const userId = req.body.userId; // Assuming the user ID is stored in req.body.userId

            // Call the createPost method from the postService to create and add the post to the database
            const newPost = await postService.createPost(postData, username); // Pass userId as an argument

            // Return the newly created post in the response
            return res.status(201).json(newPost);
        } catch (error) {
            console.error("Error creating post:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = CreatePostController;
