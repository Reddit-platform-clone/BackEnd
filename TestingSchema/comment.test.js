const mongoose = require('mongoose');
const Comment = require('../models/commentModel');
const { ObjectId } = mongoose.Types;
require('dotenv').config();



beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
  });
}, 20000);

describe('Comment Model Test', () => {
  beforeEach(async () => {
   
  });

  it('should be able to insert a comment into the database', async () => {
    const commentData = {
      
      postID: new ObjectId(),
      userID: 'user456',
      dateTime: new Date(),
      upvote: 5,
      content: "Er7amni ya zyad"
    };

    const comment = new Comment(commentData);
    const savedComment = await comment.save();

    expect(savedComment._id).toBeDefined();
    expect(savedComment.commentID).toBe(commentData.commentID);
    expect(savedComment.postID).toBe(commentData.postID);
    expect(savedComment.userID).toBe(commentData.userID);
    expect(savedComment.dateTime).toEqual(commentData.dateTime);
    expect(savedComment.upvote).toBe(commentData.upvote);
  }, 20000);

  it('should be able to retrieve all comments from the database', async () => {
    const commentData1 = {
     
      postID: new ObjectId,
      userID: 'user456',
      dateTime: new Date(),
      upvote: 5,
      content: "er7amni ya zyad ba2a"
    };

    const commentData2 = {
      commentID: new ObjectId(),
      postID: new ObjectId(),
      userID: 'user789',
      dateTime: new Date(),
      upvote: 3,
      content: "er7amni ya zyad tani"
    };

    await Comment.create(commentData1);
    await Comment.create(commentData2);

    const postIDs = [commentData1.postID, commentData2.postID]; // Array of post IDs

    const createdComments = await Comment.find({ postID: { $in: postIDs } });
    const numberOfComments = createdComments.length;

    expect(numberOfComments).toBe(2);
  }, 20000);
});

afterAll(async () => {
  await mongoose.connection.close();
}, 20000);
