const supertest = require('supertest');
const app = require('../server'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const faker = require('faker');

require('dotenv').config();
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const Hashtag = require('../models/hashtagModel');
const Community = require('../models/communityModel');

const request = supertest(app);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Search Functionality', () => {
    // Create some test data before running the tests
    beforeAll(async () => {
        // Generate random users
        const users = [];
        for (let i = 0; i < 10; i++) {
            const user = new User({
                username: faker.internet.userName(),
                password: "secret",
                email: faker.internet.email()
            });
            users.push(user);
        }
        await User.insertMany(users);

        // Generate random posts
        const posts = [];
        for (let i = 0; i < 10; i++) {
            const userIndex = Math.floor(Math.random() * users.length);
            const post = new Post({
                postId: faker.internet.userName(), // Ensure postId is unique for each post
                userId: users[userIndex]._id, // Assign a random userId
                content: faker.lorem.paragraph(),
                title: "post",
                parentId: "mom",
                communityId: "communitysecret",
                numViews: 0,
                isLocked: false
            });
            posts.push(post);
        }
        await Post.insertMany(posts);

        // Generate random comments
        const comments = [];
        for (let i = 0; i < 10; i++) {
            const comment = new Comment({
                userID: users[Math.floor(Math.random() * users.length)]._id,
                postID: posts[Math.floor(Math.random() * posts.length)]._id,
                content: faker.lorem.sentence(),
            });
            comments.push(comment);
        }
        await Comment.insertMany(comments);

        // Generate random hashtags
        const hashtags = [];
        for (let i = 0; i < 10; i++) {
            const hashtag = new Hashtag({
                hashtagString: faker.internet.userName()
            });
            hashtags.push(hashtag);
        }
        await Hashtag.insertMany(hashtags);

        // Generate random communities
        const communities = [];
        for (let i = 0; i < 10; i++) {
            const community = new Community({
                communityName: faker.lorem.words(),
                moderatorsUsernames: "moderatorUser"
            });
            communities.push(community);
        }
        await Community.insertMany(communities);
    });

    it('should search users by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/users')
            .query({ keyword });

        expect(response.statusCode).toBe(200);
    });

    it('should search posts by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/posts')
            .query({ keyword });

        expect(response.statusCode).toBe(200);
    });

    it('should search comments by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/comments')
            .query({ keyword });

        expect(response.statusCode).toBe(200);
    });

    it('should search communities by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/communities')
            .query({ keyword });

        expect(response.statusCode).toBe(200);
    });

    it('should search hashtags by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/hashtags')
            .query({ keyword });

        expect(response.statusCode).toBe(200);
    });
});
