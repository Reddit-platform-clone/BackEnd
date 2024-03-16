const mongoose = require('mongoose');

const User = require('../models/userModel');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}, 20000);

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
      };

      const user = new User(userData);
      const savedUser = await user.save();

      expect(savedUser._id).toBeDefined();
      expect(savedUser.username).toBe(userData.username);
      expect(savedUser.password).toBe(userData.password);
      expect(savedUser.email).toBe(userData.email);
      expect(savedUser.dateOfBirth).toBe(userData.dateOfBirth);
      expect(savedUser.displayName).toBe(userData.displayName);
      expect(savedUser.profilePicture).toBe(userData.profilePicture);
      expect(savedUser.followers.toObject()).toEqual(userData.followers);
      expect(savedUser.blockedUsers.toObject()).toEqual(userData.blockedUsers);
      expect(savedUser.about).toBe(userData.about);
      expect(savedUser.interests.toObject()).toEqual(userData.interests);
      expect(savedUser.gender).toEqual(userData.gender);
      expect(savedUser.socialLinks.toObject()).toEqual(userData.socialLinks);
      expect(savedUser.token).toBe(userData.token);
  });

  it('should be able to retrieve all users from the database', async () => {
    const user1 = {
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
    };
    const user2 = {
      username: 'user456',
      password: 'password456',
      email: 'user2@gmail.com',
      dateOfBirth: '2002-01-01',
      displayName: 'user2',
      profilePicture: 'profile2.jpg',
      followers: [],
      blockedUsers: [],
      about: 'I am user2',
      interests: ['frisbee', 'reading'],
      gender: 'Female',
      socialLinks: [],
      token: 'token456'
    };

    await User.create(user1);
    await User.create(user2);

    const users = await User.find({});
    expect(users.length).toBe(2);
  });
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);