const mongoose = require('mongoose');
const post = require('../models/postModel');
require('dotenv').config();

console.log(process.env.MONGO_URI);

beforeAll(async () =>
 {
    await mongoose.connect(process.env.MONGO_URI, {
    });
}, 20000);


describe('Post Controller', () => {
    let username;
    let postId;

    beforeAll(async () => {
        // Create a mock user for testing
        const user = {  
        username: 'user123',
        password: 'password123',
        email: 'user@gmail.com',
        dateOfBirth: '1999-01-01',
        displayName: 'myuser',
        profilePicture: 'profile.jpg',
        followers: [],
        blockedUsers: [],
        about: 'I am a user',
        interests: ['music', 'sports'],
        gender: 'Male',
        socialLinks: [],
        token: 'token123'};

        const newUser = await userService.createUser(user);
        username = newUser.username; // Save the username for later use
    });

    it('should create a new post and retrieve it successfully', async () => {
        // Create a mock post data
        const postData = {
        user_id: 'radwaPost',
        date_time: new Date(),
        subreddit_id: 3,
        post_content: 'hi first post'
        };

        // Create a new post
        const newPost = await postService.createPost(postData, username);
        postId = newPost.post_id; // Save the post ID for later use

        // Retrieve the created post
        const retrievedPost = await postService.getPostById(post_id);

        // Expectations
        expect(retrievedPost).toBeDefined();
        expect(retrievedPost.post_id).toBeDefined();
        expect(retrievedPost.user_id).toBe(postData.user_id);
        expect(retrievedPost.date_time).toEqual(postData.date_time);
        expect(retrievedPost.subreddit_id).toBe(postData.subreddit_id);
    });
}, 20000);

afterAll(async () => {
    await mongoose.connection.close();
    }, 20000);
    