const searchByService = require('../services/searchByService'); 

const searchByController = {
    users: async (req, res) => {
        try {
            // Implement logic to search by users
            const usersResults = await User.find({ /* search criteria */ });

            // Return users results
            return res.status(200).json(usersResults);
        } catch (error) {
            console.error("Error searching by users:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    
    posts: async (req, res) => {
        try {
            // Logic to search by posts
            let posts = await Post.find({ /* search criteria */ });

            // Logic for Trending Today
            const today = new Date();
            today.setHours(0, 0, 0, 0); // Set time to the beginning of today
            posts = posts.filter(post => post.createdAt >= today); // Filter posts created today

            // Logic for Sorting (Assuming sorting by date in descending order)
            posts.sort((a, b) => b.createdAt - a.createdAt); // Sort posts by date in descending order

            // return posts results
            return res.status(200).json(posts);
        } catch (error) {
            console.error("Error searching by posts:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    },
    
    comments: async (req, res) => {
        try {
            // Implement logic to search by comments
            const commentsResults = await Comment.find({ /* search criteria */ });

            // Implement logic for sorting

            // Return comments results
            return res.status(200).json(commentsResults);
        } catch (error) {
            console.error("Error searching by comments:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    communities: async (req, res) => {
        try {
            // Implement logic to search by communities
            const communitiesResults = await Community.find({ /* search criteria */ });

            // Return communities results
            return res.status(200).json(communitiesResults);
        } catch (error) {
            console.error("Error searching by communities:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    hashtags: async (req, res) => {
        try {
            // Implement logic to search by hashtags
            const hashtagsResults = await Hashtag.find({ /* search criteria */ });

            // Return hashtags results
            return res.status(200).json(hashtagsResults);
        } catch (error) {
            console.error("Error searching by hashtags:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};


module.exports = searchByController;