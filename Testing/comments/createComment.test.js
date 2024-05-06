const  commentService = require('../../services/commentService');
const { validationResult } = require('express-validator');
const UserModel = require('../../models/userModel');
const Post = require('../../models/postModel');
const Comment = require('../../models/commentModel');
const Mention = require('../../models/mentionModel');
const modqueue = require('../../models/modqueueModel');
const pushNotificationService = require('../../services/notificationsService');

jest.mock('express-validator', () => ({
  validationResult: jest.fn(),
}));

jest.mock('../../models/userModel', () => ({
  findOne: jest.fn(),
}));

jest.mock('../../models/postModel', () => ({
  exists: jest.fn(),
}));

jest.mock('../../models/commentModel', () => ({
  exists: jest.fn(),
  save: jest.fn(),
}));

jest.mock('../../models/mentionModel', () => ({
  save: jest.fn(),
}));

jest.mock('../../models/modqueueModel', () => ({
  save: jest.fn(),
}));

jest.mock('../../services/notificationsService', () => ({
  sendPushNotificationToToken: jest.fn(),
}));

describe('postComment function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error if validation fails', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => false, array: () => ['validation error'] });
    const result = await commentService.postComment({ commentData: {} });
    expect(result).toEqual({ success: false, errors: ['validation error'] });
  });

  it('should return error if sender does not exist', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    UserModel.findOne.mockResolvedValueOnce(null);
    const result = await commentService.postComment({ username: 'nonexistent_user', commentData: {} });
    expect(result).toEqual({ success: false, error: 'Sender  does not exist.' });
  });

  it('should return error if post does not exist or is locked', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    UserModel.findOne.mockResolvedValueOnce({});
    Post.exists.mockResolvedValueOnce(false);
    const result = await commentService.postComment({ username: 'username', commentData: { postID: 'nonexistent_post', replyToID: null } });
    expect(result).toEqual({ success: false, error: 'Post  does not exist or Locked.' });
  });

  it('should return error if replyToID is missing for reply comment', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    UserModel.findOne.mockResolvedValueOnce({});
    Post.exists.mockResolvedValueOnce(true);
    const result = await commentService.postComment({ username: 'username', commentData: { postID: 'existing_post', replyToID: null }, rr: 'reply' });
    expect(result).toEqual({ success: false, error: 'replyToID  is missing.' });
  });

  it('should return error if comment to reply to does not exist', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    UserModel.findOne.mockResolvedValueOnce({});
    Post.exists.mockResolvedValueOnce(true);
    Comment.exists.mockResolvedValueOnce(false);
    const result = await commentService.postComment({ username: 'username', commentData: { postID: 'existing_post', replyToID: 'nonexistent_comment' }, rr: 'reply' });
    expect(result).toEqual({ success: false, error: 'Comment  does not exist.' });
  });

  it('should successfully post comment without mentions', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    UserModel.findOne.mockResolvedValueOnce({});
    Post.exists.mockResolvedValueOnce(true);
    Comment.save.mockResolvedValueOnce({});
    const result = await commentService.postComment({ username: 'username', commentData: { postID: 'existing_post', content: 'comment content' } });
    expect(result).toEqual({ success: true, message: 'comment sent successfully.' });
  });

  it('should successfully post comment with mentions', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    UserModel.findOne.mockResolvedValueOnce({});
    Post.exists.mockResolvedValueOnce(true);
    Comment.save.mockResolvedValueOnce({ _id: 'comment_id', postID: 'existing_post' });
    UserModel.findOne.mockResolvedValueOnce({ username: 'mentioned_user', blockedUsers: [] });
    Mention.save.mockResolvedValueOnce({});
    pushNotificationService.sendPushNotificationToToken.mockResolvedValueOnce({});
    const result = await commentService.postComment({ username: 'username', commentData: { postID: 'existing_post', content: 'mentioning @mentioned_user', userID: 'username' } });
    expect(result).toEqual({ success: true, message: 'comment sent successfully with mentions.' });
  });

  it('should handle error if comment did not save', async () => {
    validationResult.mockReturnValueOnce({ isEmpty: () => true });
    UserModel.findOne.mockResolvedValueOnce({});
    Post.exists.mockResolvedValueOnce(true);
    Comment.save.mockResolvedValueOnce(null);
    const result = await commentService.postComment({ username: 'username', commentData: { postID: 'existing_post', content: 'comment content' } });
    expect(result).toEqual({ success: false, error: 'comment  did not save.' });
  });

});
