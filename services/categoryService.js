const Post = require('../models/postModel');

const categoryService = {
    best: async (req, res, keyword) => {
        try {
            const bestPosts = await Post.find({ 
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { content: { $regex: keyword, $options: 'i' } }
                ]
            })
            .sort({ 
                $sum: { 
                    $add: ["$upvotes", "$comments"]
                }, 
                createdAt: -1 
            })
            .limit(100);

            return res.status(200).json(bestPosts);
        } catch (error) {
            console.error("Error fetching best posts:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    hot: async (req, res, keyword) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const hotPosts = await Post.find({ 
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { content: { $regex: keyword, $options: 'i' } }
                ],
                createdAt: { $gte: today }
            })
            .sort({ 
                $sum: { 
                    $divide: ["$upvotes", { $subtract: [ new Date(), "$createdAt" ] }]
                }
            })
            .limit(100);

            return res.status(200).json(hotPosts);
        } catch (error) {
            console.error("Error fetching hot posts:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    new: async (req, res, keyword) => {
        try {
            const newPosts = await Post.find({ 
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { content: { $regex: keyword, $options: 'i' } }
                ]
            })
            .sort({ createdAt: -1 })
            .limit(100);

            return res.status(200).json(newPosts);
        } catch (error) {
            console.error("Error fetching new posts:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    today: async (req, res, keyword) => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const todayPosts = await Post.find({ 
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { content: { $regex: keyword, $options: 'i' } }
                ],
                createdAt: { $gte: today }
            })
            .sort({ 
                $sum: { 
                    $add: ["$upvotes", "$comments"]
                } 
            })
            .limit(100);

            return res.status(200).json(todayPosts);
        } catch (error) {
            console.error("Error fetching posts created today:", error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = categoryService;
