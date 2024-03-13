
const categoryService = require('../services/categoryService');

const categoryController = {
    best: async (req, res) => {
        try {
            // Fetch best posts from the category service
            const bestPosts = categoryService.getBestPosts();
            // Assume bestPosts contains an array of post objects
            res.status(200).json({ success: true, data: bestPosts });
        } catch (error) {
            console.error("Error fetching best posts:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    },
    hot: async (req, res) => {
        try {
            // Fetch hot posts from the category service
            const hotPosts = categoryService.getHotPosts();
            // Assume hotPosts contains an array of post objects
            res.status(200).json({ success: true, data: hotPosts });
        } catch (error) {
            console.error("Error fetching hot posts:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    },
    new: async (req, res) => {
        try {
            // Fetch new posts from the category service
            const newPosts = categoryService.getNewPosts();
            // Assume newPosts contains an array of post objects
            res.status(200).json({ success: true, data: newPosts });
        } catch (error) {
            console.error("Error fetching new posts:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    },
    today: async (req, res) => {
        try {
            // Fetch posts from today from the category service
            const todayPosts = categoryService.getTodayPosts();
            // Assume todayPosts contains an array of post objects
            res.status(200).json({ success: true, data: todayPosts });
        } catch (error) {
            console.error("Error fetching today's posts:", error);
            res.status(500).json({ success: false, error: "Internal Server Error" });
        }
    }
};

module.exports = categoryController;

