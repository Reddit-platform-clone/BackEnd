const supertest = require('supertest'); 
const mongoose = require('mongoose');
const faker = require('faker');

require('dotenv').config();
const User = require('../models/userModel');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const Hashtag = require('../models/hashtagModel');
const Community = require('../models/communityModel');

beforeAll(async () => {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI);
},20000);

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Search Functionality', () => {
    it('should search users by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/users', 'test')
            .send({keyword: keyword});

        expect(response.statusCode).toBe(200);
    });

    it('should search posts by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/posts')
            .send({ keyword: keyword });

        expect(response.statusCode).toBe(200);
    });

    it('should search comments by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/comments')
            .send({ keyword: keyword });

        expect(response.statusCode).toBe(200);
    });

    it('should search communities by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/communities')
            .send({ keyword: keyword });

        expect(response.statusCode).toBe(200);
    });

    it('should search hashtags by keyword', async () => {
        const keyword = 'test';
        const response = await supertest('http://localhost:5000/')
            .get('searchBy/hashtags')
            .send({ keyword: keyword });

        expect(response.statusCode).toBe(200);
    });
});
