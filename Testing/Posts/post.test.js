const  createPostService = require('../../services/createPostService');
const Community = require('../../models/communityModel');
const User = require('../../models/userModel');
const Post = require('../../models/postModel');
const Mention = require('../../models/mentionModel');
const pushNotificationService = require('../../services/notificationsService');
const modqueue = require('../../models/modqueueModel');
jest.mock('../../models/communityModel', () => ({
  findOne: jest.fn(),
}));

jest.mock('../../models/userModel', () => ({
  findOne: jest.fn(),
}));

jest.mock('../../models/postModel', () => ({
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

describe('createPost function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return error if title or communityId is null', async () => {
    const result = await createPostService.createPost({ title: null, communityId: null }, 'username');
    expect(result).toEqual({ success: false, error: 'title or communityId is null.' });
  });

  it('should return error if community does not exist', async () => {
    Community.findOne.mockResolvedValueOnce(null);
    const result = await createPostService.createPost({ title: 'Post Title', communityId: 'nonexistent_community' }, 'username');
    expect(result).toEqual({ success: false, error: 'community does not exists.' });
  });

  it('should successfully create post without content or mentions', async () => {
    const communityMock = { _id: 'community_id', posts: [], save: jest.fn() };
    const userMock = { username: 'username', blockedUsers: [] };
    Community.findOne.mockResolvedValueOnce(communityMock);
    User.findOne.mockResolvedValueOnce(userMock);
    Post.save.mockResolvedValueOnce({ _id: 'post_id' });
    const result = await createPostService.createPost({ title: 'Post Title', communityId: 'existing_community' }, 'username');
    expect(result).toEqual({ success: true, message: 'post sent successfully.' });
    expect(communityMock.posts).toContain('post_id');
    expect(communityMock.save).toHaveBeenCalled();
  });

  it('should successfully create post with content and mentions', async () => {
    const communityMock = { _id: 'community_id', posts: [], save: jest.fn() };
    const userMock = { username: 'username', blockedUsers: [] };
    Community.findOne.mockResolvedValueOnce(communityMock);
    User.findOne.mockResolvedValueOnce(userMock);
    Post.save.mockResolvedValueOnce({ _id: 'post_id', content: 'Post content mentioning @mentioned_user' });
    User.findOne.mockResolvedValueOnce({ username: 'mentioned_user', blockedUsers: [] });
    Mention.save.mockResolvedValueOnce({});
    pushNotificationService.sendPushNotificationToToken.mockResolvedValueOnce({});
    const result = await createPostService.createPost({ title: 'Post Title', communityId: 'existing_community', content: 'Post content mentioning @mentioned_user' }, 'username');
    expect(result).toEqual({ success: true, message: 'post sent successfully with mentions.' });
  });

  it('should handle error if post did not save', async () => {
    const communityMock = { _id: 'community_id', posts: [], save: jest.fn() };
    const userMock = { username: 'username', blockedUsers: [] };
    Community.findOne.mockResolvedValueOnce(communityMock);
    User.findOne.mockResolvedValueOnce(userMock);
    Post.save.mockResolvedValueOnce(null);
    const result = await createPostService.createPost({ title: 'Post Title', communityId: 'existing_community' }, 'username');
    expect(result).toEqual({ success: false, error: 'post  did not save.' });
  });


});
