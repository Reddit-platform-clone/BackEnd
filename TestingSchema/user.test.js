const mongoose = require('mongoose');

const Comment = require('../models/userModel');
const { describe, before, it } = require('node:test');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});

describe('User Model Test', () => {
    beforeEach(async () => {
        await User.deleteMany({});
    });

    it('should be able to insert a user into the database', async () => {
        const userData = {
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
            token: 'token123'
        }
    })
})