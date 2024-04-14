const mongoose = require('mongoose');
const Post = require('../models/postModel.js');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
}, 20000);

describe('Post model test', () => {
    it('Insert a post into the database', async () => {
        const postData = {
            postId: 6,
            content: '',
            title: 'chreg',
            userId: 'yousefwael02',
            parentId: 6,
            media: [],
            downvotes: 1,
            communityId: 6,
            communityName: '6',
            upvotes: 154,
            numComments: 25,
            scheduled: false,
            isSpoiler: false,
            numViews: 18,
            isLocked: false 
        };

        const post = new Post(postData);
        const savedPost = await post.save();

        expect(savedPost._id).toBeDefined();
        expect(savedPost.userId).toBe(postData.userId);
        expect(savedPost.dateTime).toBeDefined();
        expect(savedPost.parentId).toBe(postData.parentId);
        expect(savedPost.subredditId).toBe(postData.subredditId);
        expect(savedPost.numComments).toBe(postData.numComments);
        expect(savedPost.isLocked).toBe(false);
        expect(savedPost.numViews).toBe(postData.numViews);
    }, 20000);
}, 20000);

afterAll(async () => {
    await mongoose.connection.close();
}, 20000);