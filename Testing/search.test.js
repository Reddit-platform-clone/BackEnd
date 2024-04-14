const supertest = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from app.js
const mongoose = require('mongoose');
const faker = require('faker');

const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const Hashtag = require('../models/hashtagModel');
const Community = require('../schemas/communitySchema');

const request = supertest(app);

beforeAll(async () => {
    // Connect to MongoDB
    await mongoose.connect('mongodb+srv://admin:admin4321@reddit-clone.af8eobe.mongodb.net/reddit-clone?retryWrites=true&w=majority&appName=Reddit-clone', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
});

afterAll(async () => {
    // Disconnect from MongoDB
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
                // Other user properties
            });
            users.push(user);
        }
        await User.insertMany(users);

        // Generate random posts
        const posts = [];
        for (let i = 0; i < 10; i++) {
            const post = new Post({
                userId: users[Math.floor(Math.random() * users.length)]._id,
                content: faker.lorem.paragraph(),
                // Other post properties
            });
            posts.push(post);
        }
        await Post.insertMany(posts);

        // Generate random comments
        const comments = [];
        for (let i = 0; i < 10; i++) {
            const comment = new Comment({
                userId: users[Math.floor(Math.random() * users.length)]._id,
                postId: posts[Math.floor(Math.random() * posts.length)]._id,
                content: faker.lorem.sentence(),
                // Other comment properties
            });
            comments.push(comment);
        }
        await Comment.insertMany(comments);

        // Generate random hashtags
        const hashtags = [];
        for (let i = 0; i < 10; i++) {
            const hashtag = new Hashtag({
                name: faker.lorem.word(),
                // Other hashtag properties
            });
            hashtags.push(hashtag);
        }
        await Hashtag.insertMany(hashtags);

        // Generate random communities
        const communities = [];
        for (let i = 0; i < 10; i++) {
            const community = new Community({
                name: faker.lorem.words(),
                // Other community properties
            });
            communities.push(community);
        }
        await Community.insertMany(communities);
    });

    it('should search users by keyword', async () => {
        const keyword = 'test';
        const response = await request.get(`/search/users?keyword=${keyword}`);
        expect(response.status).toBe(200);
        // Add your assertions here for users search
    });

    it('should search posts by keyword', async () => {
        const keyword = 'test';
        const response = await request.get(`/search/posts?keyword=${keyword}`);
        expect(response.status).toBe(200);
        // Add your assertions here for posts search
    });

    it('should search comments by keyword', async () => {
        const keyword = 'test';
        const response = await request.get(`/search/comments?keyword=${keyword}`);
        expect(response.status).toBe(200);
        // Add your assertions here for comments search
    });

    it('should search communities by keyword', async () => {
        const keyword = 'test';
        const response = await request.get(`/search/communities?keyword=${keyword}`);
        expect(response.status).toBe(200);
        // Add your assertions here for communities search
    });

    it('should search hashtags by keyword', async () => {
        const keyword = 'test';
        const response = await request.get(`/search/hashtags?keyword=${keyword}`);
        expect(response.status).toBe(200);
        // Add your assertions here for hashtags search
    });
});
