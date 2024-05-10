const editService = require('../services/editService');
const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const UserModel = require('../models/userModel');
const Modqueue = require('../models/modqueueModel');
jest.mock('../models/commentModel');
jest.mock('../models/postModel');
jest.mock('../models/userModel');
jest.mock('../models/modqueueModel');
describe('editService - editUserText', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should edit user text for a comment successfully', async () => {
      
        const username = 'testUser';
        const data = {
            type: 'comment',
            entityId: 'testCommentId',
            newText: 'Edited comment text',
        };

   
        UserModel.exists = jest.fn().mockResolvedValue(true);
        Comment.findOne = jest.fn().mockResolvedValue({ _id: 'testCommentId', userID: 'testUser', save: jest.fn() });

        
        const result = await editService.editUserText(username, data);
  
        const expectedResult = {
            success: true,
            message: 'Text editted successfully.',
        };

     
        expect(result).toEqual(expectedResult);

    });

    it('should edit user text for a post successfully', async () => {
      
        const username = 'testUser';
        const data = {
            type: 'post',
            entityId: 'testPostId',
            newText: 'Edited post text',
        };

       
        UserModel.exists = jest.fn().mockResolvedValue(true);
        Post.findOne = jest.fn().mockResolvedValue({ _id: 'testPostId', username: 'testUser', save: jest.fn() });

        
        Modqueue.findOne = jest.fn().mockResolvedValue({ modStatus: 'modStatusValue', save: jest.fn() });

      
        const result = await editService.editUserText(username, data);

        const expectedResult = {
            success: true,
            message: 'Text editted successfully.',
        };

     
        expect(result).toEqual(expectedResult);
    });
});
