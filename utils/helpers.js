const bcrypt = require('bcrypt');
const axios = require('axios');
const userModel = require('../models/userModel');

const hashPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

const validatePassword = async (password, hash) => {
  const compare = await bcrypt.compare(password, hash);
  return compare;
};

const updatePassword = async (username, oldPassword, newPassword) => {
  const user = await userModel.findOne({ username: username });
  const currentPassword = user.password;
  const correctPassword = await validatePassword(oldPassword, currentPassword)
  if (!correctPassword) throw new Error('incorrect password');
  const newHashedPassword = await hashPassword(newPassword);
  console.log(newPassword)
  user.password = newHashedPassword;
  await user.save();

  return newHashedPassword;
}

function isValidEmail(email) {
  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  return email.match(pattern) !== null;
};

const verifyGoogleToken = async (accessToken) => {
  try {
    const response = await axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
    userData = response.data
    return userData;
  } catch(err) { throw new Error(err); }
};

const generateRandomUsername = () => {
  const adjectives = ["Red", "Blue", "Black", "White", "Fast", "Wicked", "Cozy"];
  const nouns = ["Driver", "Cowboy", "Cat", "Owl", "Cheetah", "Riddler", "Joker"];

  const getRandomElement = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  const adjective = getRandomElement(adjectives);
  const noun = getRandomElement(nouns);
  const number = getRandomNumber(10, 99);
  
  const username = `${adjective}_${noun}_${number}`;
  return username;
}

module.exports = { hashPassword, validatePassword, updatePassword, isValidEmail, verifyGoogleToken, generateRandomUsername };