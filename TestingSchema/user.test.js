const mongoose = require('mongoose');

const User = require('../models/userModel');
const e = require('express');
const exp = require('constants');
console.log(process.env.MONGO_URI);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
  });
}, 20000);

describe('User Model Test', () => {
  beforeEach(async () => {
      
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

    await User.create(user1, user2);

    const users = await User.find({});
    expect(users.length).toBe(2);
  });

  it('should be able to retrieve a user by username from the database', async () => {
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

    await User.create(user1);

    const retrievedUser  = await User.findOne({ username: user1.username });

    expect(retrievedUser.username).toBe(user1.username);
    expect(retrievedUser.password).toBe(user1.password);
    expect(retrievedUser.email).toBe(user1.email);
    expect(retrievedUser.dateOfBirth).toBe(user1.dateOfBirth);
    expect(retrievedUser.displayName).toBe(user1.displayName);
    expect(retrievedUser.profilePicture).toBe(user1.profilePicture);
    expect(retrievedUser.followers.toObject()).toEqual(user1.followers);
    expect(retrievedUser.blockedUsers.toObject()).toEqual(user1.blockedUsers);
    expect(retrievedUser.about).toBe(user1.about);
    expect(retrievedUser.interests.toObject()).toEqual(user1.interests);
    expect(retrievedUser.gender).toEqual(user1.gender);
    expect(retrievedUser.socialLinks.toObject()).toEqual(user1.socialLinks);
    expect(retrievedUser.token).toBe(user1.token);
  });

  it('should be able to retrieve any user with a given interest', async () => {
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
      interests: ['music', 'sports', 'anime'],
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
      interests: ['frisbee', 'reading', 'anime'],
      gender: 'Female',
      socialLinks: [],
      token: 'token456'
    };

    const user3 = {
      username: 'user789',
      password: 'password456',
      email: 'user2@gmail.com',
      dateOfBirth: '2002-01-01',
      displayName: 'user3',
      profilePicture: 'profile2.jpg',
      followers: [],
      blockedUsers: [],
      about: 'I am user2',
      interests: ['frisbee', 'reading'],
      gender: 'Female',
      socialLinks: [],
      token: 'token456'
    };

    await User.create(user1, user2, user3);

    const users = await User.find({ interests: 'anime' }, 'username');
    console.log(users);

    expect(users.length).toBe(2);
  });

  it('should be able to update user data in the database', async () => {
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
      token: 'token123'
    };

    await User.create(user);
    
    const sentData = {
      username: 'user123',
      password: 'password456',
      displayName: 'batates',
      followers: ['user2'],
      blockedUsers: ['user3'],
      about: 'I am a user2',
      interests: ['music', 'sports', 'frisbee'],
      socialLinks: ['facebook.com/user123']
    };
    
    const updatedUser = await User.findOneAndUpdate({ username: sentData.username }, sentData, { new: true });

    expect(updatedUser.password).toBe(sentData.password);
    expect(updatedUser.displayName).toBe(sentData.displayName);
    expect(updatedUser.followers.toObject()).toEqual(sentData.followers);
    expect(updatedUser.blockedUsers.toObject()).toEqual(sentData.blockedUsers);
    expect(updatedUser.about).toBe(sentData.about);
    expect(updatedUser.interests.toObject()).toEqual(sentData.interests);
    expect(updatedUser.socialLinks.toObject()).toEqual(sentData.socialLinks);
  });

  it('should be able to delete a user from the database', async () => {
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
      token: 'token123'
    };

    await User.create(user);

    await User.findOneAndDelete({ username: user.username }); 

    expect(await User.findOne({ username: user.username })).toBe(null);
  })
}, 20000);

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);