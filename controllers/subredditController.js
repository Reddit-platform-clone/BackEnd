
const subredditService = require('../services/subredditService.js');

const subredditController = {
    getAllPosts: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 20;
            const posts = await subredditService.getAll(page, limit);
            res.json({ success: true, data: posts });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getBestPost: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 20;
            const bestPost = await subredditService.getBest(page, limit);
            res.json({ success: true, data: bestPost });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getHotPost: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 20;
            const hotPost = await subredditService.getHot(page, limit);
            res.json({ success: true, data: hotPost });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getNewPost: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 20;
            const newPost = await subredditService.getNew(page, limit);
            res.json({ success: true, data: newPost });
        } catch (err) {
            res.status(500).json({ success: false, error: err.message });
        }
    },

    getTopPost: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 20;
            const topPost = await subredditService.getTop(page, limit);
            res.json({ success: true, data: topPost });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },

    getRandomPost: async (req, res) => {
        try {
            const page = req.query.page || 1;
            const limit = req.query.limit || 20;
            const randomPost = await subredditService.getRandom(page, limit);
            res.json({ success: true, data: randomPost });
        } catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    },
};

module.exports = subredditController;