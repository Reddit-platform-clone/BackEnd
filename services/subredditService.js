

const Post = require('../models/postModel.js');
const enrichPostsWithExtras  = require('./modifierPostService.js');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const subredditService = {
    getAll: async (page = 1, limit = 20) => {
        try {
            // Ensure that page and limit are parsed as numbers
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);
    
            // Calculate the skip value based on the page and limit
            const skip = (page - 1) * limit;
    
            // Fetch posts from the database with pagination
            const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
            const postIds = posts.map(post => post._id);
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds);
    
            return {
                posts: postWithExtraAttributes,
                currentPage: page,
                totalPages: Math.ceil(await Post.countDocuments() / limit),
                totalPosts: await Post.countDocuments()
            };
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Failed to fetch posts');
        }
    },

    getBest: async (page = 1, limit = 20) => {
        try {
            // Ensure that page and limit are parsed as numbers
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);
    
            // Calculate the skip value based on the page and limit
            const skip = (page - 1) * limit;
    
            // Fetch posts from the database with pagination
            const posts = await Post.find().sort({ upvotes: -1 }).skip(skip).limit(limit);
            const postIds = posts.map(post => post._id);
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds);
    
            // Sort posts based on upvotes
            postWithExtraAttributes.sort((a, b) => {
                return b.upvotes - a.upvotes;
            });
    
            return {
                posts: postWithExtraAttributes,
                currentPage: page,
                totalPages: Math.ceil(await Post.countDocuments() / limit),
                totalPosts: await Post.countDocuments()
            };
        } catch (error) {
            console.error('Error fetching best post:', error);
            throw new Error('Failed to fetch best post');
        }
    },

    getHot: async (page = 1, limit = 20) => {
        try {
            // Ensure that page and limit are parsed as numbers
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);
    
            // Calculate the skip value based on the page and limit
            const skip = (page - 1) * limit;
    
            // Fetch posts from the database with pagination
            const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
            const postIds = posts.map(post => post._id);
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds);
    
            // Sort posts based on hotness score criteria
            postWithExtraAttributes.sort((a, b) => {
                const scoreA = a.upvotes + a.numComments - Math.floor((Date.now() - a.createdAt) / (1000 * 60 * 60 * 24));
                const scoreB = b.upvotes + b.numComments - Math.floor((Date.now() - b.createdAt) / (1000 * 60 * 60 * 24));
                return scoreB - scoreA;
            });
    
            return {
                posts: postWithExtraAttributes,
                currentPage: page,
                totalPages: Math.ceil(await Post.countDocuments() / limit),
                totalPosts: await Post.countDocuments()
            };
        } catch (error) {
            console.error('Error fetching hot posts:', error);
            throw new Error('Failed to fetch hot posts');
        }
    },

    getNew: async (page = 1, limit = 20) => {
        try {
            // Ensure that limit is parsed as a number
            limit = parseInt(limit, 10);

            // Calculate the skip value based on the page and limit
            const skip = (page - 1) * limit;

            // Fetch posts from the database with pagination
            const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
            const postIds = posts.map(post => post._id);
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds);

            return {
                posts: postWithExtraAttributes,
                currentPage: page,
                totalPages: Math.ceil(await Post.countDocuments() / limit),
                totalPosts: await Post.countDocuments()
            };
        } catch (error) {
            console.error('Error fetching new posts:', error);
            throw new Error('Failed to fetch new posts');
        }
    },


    getTop: async (page = 1, limit = 20) => {
        try {
            // Ensure that page and limit are parsed as numbers
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);
    
            // Calculate the skip value based on the page and limit
            const skip = (page - 1) * limit;
    
            // Fetch posts from the database with pagination
            const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
            const postIds = posts.map(post => post._id);
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds);
    
            // Sort posts based on top score criteria
            postWithExtraAttributes.sort((a, b) => {
                const scoreA = a.upvotes + a.numComments;
                const scoreB = b.upvotes + b.numComments;
                return scoreB - scoreA;
            });
    
            return {
                posts: postWithExtraAttributes,
                currentPage: page,
                totalPages: Math.ceil(await Post.countDocuments() / limit),
                totalPosts: await Post.countDocuments()
            };
        } catch (error) {
            console.error('Error fetching top posts:', error);
            throw new Error('Failed to fetch top posts');
        }
    },

    getRandom: async (page = 1, limit = 20) => {
        try {
            // Ensure that page and limit are parsed as numbers
            page = parseInt(page, 10);
            limit = parseInt(limit, 10);
    
            // Calculate the skip value based on the page and limit
            const skip = (page - 1) * limit;
    
            // Fetch posts from the database
            const posts = await Post.find();
            const randomPosts = shuffleArray(posts).slice(skip, skip + limit);
            const postIds = randomPosts.map(post => post._id);
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds);
            
            return {
                posts: postWithExtraAttributes,
                currentPage: page,
                totalPages: Math.ceil(posts.length / limit),
                totalPosts: posts.length
            };
        } catch (error) {
            console.error('Error fetching random posts:', error);
            throw new Error('Failed to fetch random posts');
        }
    },
    
};

module.exports = subredditService;