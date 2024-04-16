const mongoose = require('mongoose');
const createPost = require('../services/createPostService');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const faker = require('faker');
require('dotenv').config();

beforeAll(async () => {
    //fix later
    await mongoose.connect(process.env.MONGO_URI);
  }, 20000);

describe('Post Controller', () => {

    


    it('should create a new post and retrieve it successfully', async () => {
        // Create a mock post data
        const postData = {
        userId: "poster",
        parentId: "parent",
        content: 'hi first post',
        communityId: "1234",
        isLocked: false
        };

        // Create a new post
        const newPost = await createPost.createPost(postData);

        // Retrieve the created post
        const retrievedPost = await createPost.getPostById(postId);

        // Expectations
        expect(retrievedPost).toBeDefined();
        expect(retrievedPost.postId).toBeDefined();
        expect(retrievedPost.userId).toBe(postData.userId);
        expect(retrievedPost.communityId).toBe(postData.communityId);
    });
}, 20000);

afterAll(async () => {
    await mongoose.connection.close();
}, 20000);
    