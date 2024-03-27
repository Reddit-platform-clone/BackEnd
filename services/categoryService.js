
const Category = require('../models/postCategoryModel');

const categoryService = {
    best: async (req, res) => {
        //get array of best posts
        //return message
    },
    hot: async (req, res) => {
        //get array of hot posts
        //return message
    },
    new: async (req, res) => {
        //get array of new posts
        //return message
    },
    today: async (req, res) => {
        //get array of posts created today
        //return message
    }
};

module.exports = categoryService;

