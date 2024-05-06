
const UserModel = require('../../models/userModel'); 
const Comment = require('../../models/commentModel'); 
const Post = require('../../models/postModel'); 
const editService = require('../../services/editService');

jest.mock('../../models/userModel', () => ({
  exists: jest.fn(),
}));

jest.mock('../../models/commentModel', () => ({
  findOne: jest.fn(),
  updateOne: jest.fn(),
}));

jest.mock('../../models/postModel', () => ({
  findOne: jest.fn(),
  updateOne: jest.fn(),
}));

describe('editUserText function', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
console.log(editService)
  it('should return error if type or entityId is missing', async () => {
    const result = await editService.editUserText('username', { type: '', entityId: '' });
    console.log(result)
    expect(result).toEqual({ success: false, errors: 'entityId,type cant be empty' });
  });

  it('should return error if type is neither comment nor post', async () => {
    const result = await editService.editUserText('username', { type: 'invalid', entityId: 'entityId' });
    expect(result).toEqual({ success: false, error: 'type is not comment or post.' });
  });

  it('should return error if user does not exist', async () => {
    UserModel.exists.mockResolvedValue(false);
    const result = await editService.editUserText('nonexistent_user', { type: 'comment', entityId: 'entityId' });
    expect(result).toEqual({ success: false, error: 'user does not exist.' });
  });

  it('should return error if comment does not exist', async () => {
    UserModel.exists.mockResolvedValue(true);
    Comment.findOne.mockResolvedValue(null);
    const result = await editService.editUserText('username', { type: 'comment', entityId: 'nonexistent_entity' });
    expect(result).toEqual({ success: false, error: 'comment does not exist.' });
  });

  it('should return error if user is not authorized to edit comment', async () => {
    UserModel.exists.mockResolvedValue(true);
    Comment.findOne.mockResolvedValue({ userID: 'another_user' });
    const result = await editService.editUserText('username', { type: 'comment', entityId: 'entityId' });
    expect(result).toEqual({ success: false, error: 'user  not authorized.' });
  });

  it('should successfully edit comment', async () => {
    UserModel.exists.mockResolvedValue(true);
    Comment.findOne.mockResolvedValue({ userID: 'username' });
    const result = await editService.editUserText('username', { type: 'comment', entityId: 'entityId', newText: 'newText' });
    expect(result).toEqual({ success: true, message: 'Text editted successfully.' });
  });

  it('should return error if post does not exist', async () => {
    UserModel.exists.mockResolvedValue(true);
    Post.findOne.mockResolvedValue(null);
    const result = await editService.editUserText('username', { type: 'post', entityId: 'nonexistent_entity' });
    expect(result).toEqual({ success: false, error: 'post does not exist.' });
  });

  it('should return error if user is not authorized to edit post', async () => {
    UserModel.exists.mockResolvedValue(true);
    Post.findOne.mockResolvedValue({ username: 'another_user' });
    const result = await editService.editUserText('username', { type: 'post', entityId: 'entityId' });
    expect(result).toEqual({ success: false, error: 'user  not authorized.' });
  });

  it('should successfully edit post', async () => {
    UserModel.exists.mockResolvedValue(true);
    Post.findOne.mockResolvedValue({ username: 'username' });
    const result = await editService.editUserText('username', { type: 'post', entityId: 'entityId', newText: 'newText' });
    expect(result).toEqual({ success: true, message: 'Text editted successfully.' });
  });
});
