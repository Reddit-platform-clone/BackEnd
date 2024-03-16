require('dotenv').config();

const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

console.log(process.env.MONGO_URI);

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
}, 10000); // Increase timeout to 10 seconds

describe('Comment Model Test', () => {
  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  it('should be able to insert a comment into the database', async () => {
    // Test code for inserting a comment
  });

  it('should be able to retrieve all comments from the database', async () => {
    // Test code for retrieving comments
  });
});

afterAll(async () => {
  await mongoose.connection.close();
}, 10000); // Increase timeout to 10 seconds
