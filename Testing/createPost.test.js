const mongoose = require('mongoose');
const createPost = require('../services/createPostService');
const Post = require('../models/postModel');
const User = require('../models/userModel');
const faker = require('faker');
require('dotenv').config();

beforeAll(async () => {
    //fix later
    await mongoose.connect('mongodb+srv://admin:admin4321@reddit-clone.af8eobe.mongodb.net/reddit-clone?retryWrites=true&w=majority&appName=Reddit-clone', 
    {
    });
  }, 20000);

  const Username = faker.internet.userName();
  const Email = faker.internet.email();


describe('Post Controller', () => {
    let poster;
    let postId;

    

    beforeAll(async () => {
        // Create a mock user for testing
        const userData = {  
        username: Username,
        password: 'password123',
        email: Email,
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

        const user = new User(userData);
        const newUser = await user.save();

        
        poster = newUser.username;
    });

    it('should create a new post and retrieve it successfully', async () => {
        // Create a mock post data
        const postData = {
        userId: poster,
        parentId: "parent",
        content: 'hi first post',
        communityId: "1234",
        isLocked: false
        };

        // Create a new post
        const newPost = await createPost.createPost(postData, postData.userId);
        postId = newPost.postId; // Save the post ID for later use
        console.log("post id: ", postId);

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
    