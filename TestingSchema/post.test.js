const mongoose = require('mongoose');
const Post = require('../models/postModel.js');
require('dotenv').config();

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
}, 20000);

describe('Post model test', () => {

    beforeEach(async () => {
        
    });


    it('Insert a post into the database', async () => {
        const postData = {
            post_id: 2,
            user_id: 'yousefwael02',
            date_time: new Date(),
            parent_id: 2,
            subreddit_id: 3,
            num_comments: 4,
            num_views: 90,
            is_locked: true,
            upvotes: 10
        };

        const post = new Post(postData);
        const savedPost = await post.save();

        expect(savedPost._id).toBeDefined();
        expect(savedPost.user_id).toBe(postData.user_id);
        expect(savedPost.date_time).toEqual(postData.date_time);
        expect(savedPost.parent_id).toBe(postData.parent_id);
        expect(savedPost.subreddit_id).toBe(postData.subreddit_id);
        expect(savedPost.num_comments).toBe(postData.num_comments);
        expect(savedPost.is_locked).toBe(true);
        expect(savedPost.num_views).toBe(postData.num_views);
    }, 20000);
}, 20000);

afterAll(async () => {
    await mongoose.connection.close();
}, 20000);

