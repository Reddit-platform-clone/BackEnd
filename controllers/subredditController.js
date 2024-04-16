
const subredditService = require('../services/subredditService.js');

const subredditController = {
    getAllPosts: async (req, res) => {
        try {
            const posts = await subredditService.getAll();
            res.json({success: true, data: posts});
        } catch (error) {
            res.status(500).json({success: false, error: error.message});
        }
    },

    getBestPost: async (req, res) => {
        try {
            const bestPost = await subredditService.getBest();
            res.json({ succes: true, data: bestPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getHotPost: async (req, res) => {
        try {
            const hotPost = await subredditService.getHot();
            res.json({ succes: true, data: hotPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getNewPost: async (req, res) => {
        try {
            const newPost = await subredditService.getNew();
            res.json({ succes: true, data: newPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getTopPost: async (req, res) => {
        try {
            const topPost = await subredditService.getTop();
            res.json({ succes: true, data: topPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },

    getRandomPost: async (req, res) => {
        try {
            const randomPost = await subredditService.getRandom();
            res.json({ succes: true, data: randomPost });
        } catch (err) {
            res.status(500).json({  success: false, error: err.message })
        }
    },
};

module.exports = subredditController;