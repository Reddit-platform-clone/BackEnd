const mongoose = require('mongoose');

const Comment = require('../models/commentModel');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/testDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });
});

describe('Comment Model Test', () => {
  beforeEach(async () => {
    await Comment.deleteMany({});
  });

  it('should be able to insert a comment into the database', async () => {
    const commentData = {
      commentID: '12345',
      postID: 'post123',
      userID: 'user456',
      dateTime: new Date(),
      upvote: 5
    };

    const comment = new Comment(commentData);
    const savedComment = await comment.save();

    expect(savedComment._id).toBeDefined();
    expect(savedComment.commentID).toBe(commentData.commentID);
    expect(savedComment.postID).toBe(commentData.postID);
    expect(savedComment.userID).toBe(commentData.userID);
    expect(savedComment.dateTime).toEqual(commentData.dateTime);
    expect(savedComment.upvote).toBe(commentData.upvote);
  });

  it('should be able to retrieve all comments from the database', async () => {
    const commentData1 = {
      commentID: '12345',
      postID: 'post123',
      userID: 'user456',
      dateTime: new Date(),
      upvote: 5
    };

    const commentData2 = {
      commentID: '67890',
      postID: 'post456',
      userID: 'user789',
      dateTime: new Date(),
      upvote: 3
    };

    await Comment.create(commentData1);
    await Comment.create(commentData2);

    const comments = await Comment.find({});
    expect(comments.length).toBe(2);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
