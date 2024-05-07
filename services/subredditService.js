

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
    getAll: async () => {
        try {
            const posts = await Post.find();
            const postIds = posts.map(post => post._id);
            console.log(postIds)
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds)
            return postWithExtraAttributes;
        } catch (error) {
            console.log('Error fetching posts:', error);
            throw new Error('Failed to fetch post');
        }
    },

    getBest: async () => {
        // Logic to get best post
        try {
            // Fetch posts from the database
            const posts = await Post.find();
            const postIds = posts.map(post => post._id);
            console.log(postIds)
            let postWithExtraAttributes= await enrichPostsWithExtras(postIds)
            // Sort posts based on upvotes
            postWithExtraAttributes.sort((a, b) => {
                return b.upvotes - a.upvotes;
            });
            return postWithExtraAttributes;
        } catch(error) {
            console.error('Error fetching best post:', error);
            throw new Error('Failed to fetch best post');
        }
    },

    getHot: async () => {
        // Logic to get hot post
        try {
            // Fetch posts from the database
            const posts = await Post.find();
            const postIds = posts.map(post => post._id);
            console.log(postIds)
            let postWithExtraAttributes=await enrichPostsWithExtras(postIds);
            console.log(postWithExtraAttributes)
            // Sort posts based on score criteria
            postWithExtraAttributes.sort((a, b) => {
                const scoreA = a.upvotes + a.numComments - Math.floor((Date.now() - a.createdAt) / (1000 * 60 * 60 * 24));
                const scoreB = b.upvotes + b.numComments - Math.floor((Date.now() - b.createdAt) / (1000 * 60 * 60 * 24));
                return scoreB - scoreA;
            });

            return postWithExtraAttributes;
        } catch (error) {
            console.error('Error fetching hot post:', error);
            throw new Error('Failed to fetch hot post');
        }
    },

    getNew: async (page = 1, limit = 10) => {
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


    getTop: async () => {
        // Logic to get top post
        try {
            // Fetch posts from the database
            const posts = await Post.find();
            const postIds = posts.map(post => post._id);
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds)
            // Sort posts based on score criteria
            postWithExtraAttributes.sort((a, b) => {
                const scoreA = a.upvotes + a.numComments;
                const scoreB = b.upvotes + b.numComments;
                return scoreB - scoreA;
            });

            return postWithExtraAttributes;
        } catch (error) {
            console.error('Error fetching hot post:', error);
            throw new Error('Failed to fetch hot post');
        }
    },

    getRandom: async () => {
        // Logic to get random post
        try {
            // Fetch posts from the database
            const posts = await Post.find();
            const randomPosts = shuffleArray(posts);
            const postIds = randomPosts.map(post => post._id);
            console.log(postIds)
            let postWithExtraAttributes = await enrichPostsWithExtras(postIds)
            
            return postWithExtraAttributes;
        } catch (error) {
            console.error('Error fetching random post:', error);
            throw new Error('Failed to fetch random post');
        }
    }
};

module.exports = subredditService;