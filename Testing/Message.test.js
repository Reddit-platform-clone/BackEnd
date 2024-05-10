const messageService = require('../services/messageService');
const Message = require('../models/messageModel');
const UserModel = require('../models/userModel');
const Mention = require('../models/mentionModel');
const pushNotificationService = require('../services/notificationsService');

jest.mock('../models/messageModel');
jest.mock('../models/userModel');
jest.mock('../models/mentionModel');
jest.mock('../services/notificationsService');

describe('messageService - composeMessage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should compose a message successfully', async () => {
       
        const messageData = {
            title: 'Test Message',
            username: 'senderUsername',
            recipient: 'recipientUsername',
            status: 'sent',
        };

        UserModel.findOne.mockResolvedValue({ username: 'senderUsername' });
        UserModel.findOne.mockResolvedValue({ username: 'recipientUsername' });
        Message.prototype.save.mockResolvedValue({});

      
        const result = await messageService.composeMessage(messageData);

        
        expect(result.success).toBe(true);
        expect(Message.prototype.save).toHaveBeenCalledTimes(1);
        expect(pushNotificationService.sendPushNotificationToToken).toHaveBeenCalledTimes(1);
    });

  
});


describe('messageService - getInboxMessages', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return inbox messages successfully', async () => {
        const sentUsername = 'testUser';
        UserModel.findOne.mockResolvedValue({ username: sentUsername });
        Message.find.mockResolvedValue([{ title: 'Test Message 1', status: 'sent', _id: 'messageId1' }]);

        const result = await messageService.getInboxMessages(sentUsername);

        expect(result.success).toBe(true);
        expect(result.message.length).toBe(1);
        expect(Message.updateOne).toHaveBeenCalledWith(
            { _id: 'messageId1' },
            { $set: { status: 'delivered' } },
            { runValidators: true }
        );
    });

    it('should return empty array if no inbox messages found', async () => {
        const sentUsername = 'testUser';
        UserModel.findOne.mockResolvedValue({ username: sentUsername });
        Message.find.mockResolvedValue([]);

        const result = await messageService.getInboxMessages(sentUsername);

        expect(result.success).toBe(true);
        expect(result.message.length).toBe(0);
        expect(Message.updateOne).not.toHaveBeenCalled();
    });

    it('should return error if user not found', async () => {
        const sentUsername = 'testUser';
        UserModel.findOne.mockResolvedValue(null);

        const result = await messageService.getInboxMessages(sentUsername);

        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found.');
        expect(Message.updateOne).not.toHaveBeenCalled();
    });
});


describe('messageService - getUnreadMessages', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return unread messages successfully', async () => {
        const sentUsername = 'testUser';
        UserModel.findOne.mockResolvedValue({ username: sentUsername });
        Message.find.mockResolvedValue([{ title: 'Test Message 1', status: 'delivered' }]);

        const result = await messageService.getUnreadMessages(sentUsername);

        expect(result.success).toBe(true);
        expect(result.message.length).toBe(1);
    });

    it('should return empty array if no unread messages found', async () => {
        const sentUsername = 'testUser';
        UserModel.findOne.mockResolvedValue({ username: sentUsername });
        Message.find.mockResolvedValue([]);

        const result = await messageService.getUnreadMessages(sentUsername);

        expect(result.success).toBe(true);
        expect(result.message.length).toBe(0);
    });

    it('should return error if user not found', async () => {
        const sentUsername = 'testUser';
        UserModel.findOne.mockResolvedValue(null);

        const result = await messageService.getUnreadMessages(sentUsername);

        expect(result.success).toBe(false);
        expect(result.error).toBe(' error:User not found.');
    });
});

describe('messageService - deleteMessage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should delete message successfully', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const mockMessage = { _id: messageId, username: userID };
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(mockMessage);

        const result = await messageService.deleteMessage(userID, messageId);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Message deleted successfully');
        expect(Message.findOneAndDelete).toHaveBeenCalledWith({ _id: messageId });
    });

    it('should return error if message ID is null', async () => {
        const userID = 'testUser';
        const messageId = null;

        const result = await messageService.deleteMessage(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('message Id is null.');
        expect(Message.findOneAndDelete).not.toHaveBeenCalled();
    });

    it('should return error if message not found', async () => {
        const userID = 'testUser';
        const messageId = 'nonExistentMessageId';
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(null);

        const result = await messageService.deleteMessage(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Message not found.');
        expect(Message.findOneAndDelete).not.toHaveBeenCalled();
    });

    it('should return error if user not found', async () => {
        const userID = 'nonExistentUser';
        const messageId = 'testMessageId';
        Message.findOne.mockResolvedValue({});
        UserModel.findOne.mockResolvedValue(null);

        const result = await messageService.deleteMessage(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found.');
        expect(Message.findOneAndDelete).not.toHaveBeenCalled();
    });

    it('should return error if user not authorized to delete message', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const mockMessage = { _id: messageId, username: 'anotherUser' };
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(mockMessage);

        const result = await messageService.deleteMessage(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('You are not authorized to delete this message.');
        expect(Message.findOneAndDelete).not.toHaveBeenCalled();
    });

    it('should return error if deletion fails', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const mockMessage = { _id: messageId, username: userID };
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(mockMessage);
        Message.findOneAndDelete.mockRejectedValue(new Error('Deletion failed'));

        const result = await messageService.deleteMessage(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to del message.');
    });
});


describe('messageService - reportMessage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should report message successfully', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const reportDetails = 'This is a report';
        const mockMessage = { _id: messageId, username: userID };
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(mockMessage);
        Message.updateOne.mockResolvedValue({});

        const result = await messageService.reportMessage(userID, messageId, reportDetails);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Message reported successfully.');
        expect(Message.updateOne).toHaveBeenCalledWith(
            { _id: messageId },
            { $set: { report: true, reportDetails: reportDetails } },
            { runValidators: true }
        );
    });

    it('should return error if report details are null', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const reportDetails = null;

        const result = await messageService.reportMessage(userID, messageId, reportDetails);

        expect(result.success).toBe(false);
        expect(result.error).toBe('report Details is null.');
        expect(Message.updateOne).not.toHaveBeenCalled();
    });

    it('should return error if message ID is null', async () => {
        const userID = 'testUser';
        const messageId = null;
        const reportDetails = 'This is a report';

        const result = await messageService.reportMessage(userID, messageId, reportDetails);

        expect(result.success).toBe(false);
        expect(result.error).toBe('message Id is null.');
        expect(Message.updateOne).not.toHaveBeenCalled();
    });

    it('should return error if message not found', async () => {
        const userID = 'testUser';
        const messageId = 'nonExistentMessageId';
        const reportDetails = 'This is a report';
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(null);

        const result = await messageService.reportMessage(userID, messageId, reportDetails);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Message not found.');
        expect(Message.updateOne).not.toHaveBeenCalled();
    });

    it('should return error if user not found', async () => {
        const userID = 'nonExistentUser';
        const messageId = 'testMessageId';
        const reportDetails = 'This is a report';
        Message.findOne.mockResolvedValue({});
        UserModel.findOne.mockResolvedValue(null);

        const result = await messageService.reportMessage(userID, messageId, reportDetails);

        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found.');
        expect(Message.updateOne).not.toHaveBeenCalled();
    });

    it('should return error if user not authorized to report message', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const reportDetails = 'This is a report';
        const mockMessage = { _id: messageId, username: 'anotherUser' };
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(mockMessage);

        const result = await messageService.reportMessage(userID, messageId, reportDetails);

        expect(result.success).toBe(false);
        expect(result.error).toBe('You are not authorized to report this message.');
        expect(Message.updateOne).not.toHaveBeenCalled();
    });

    it('should return error if reporting fails', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const reportDetails = 'This is a report';
        const mockMessage = { _id: messageId, username: userID };
        UserModel.findOne.mockResolvedValue({ username: userID });
        Message.findOne.mockResolvedValue(mockMessage);
        Message.updateOne.mockRejectedValue(new Error('Reporting failed'));

        const result = await messageService.reportMessage(userID, messageId, reportDetails);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to report message.');
    });
});

describe('messageService - getSentMessages', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should get sent messages successfully', async () => {
        const sentUsername = 'testUser';
        const mockUser = { username: sentUsername };
        const mockMessages = [{}, {}];
        UserModel.findOne.mockResolvedValue(mockUser);
        Message.find.mockResolvedValue(mockMessages);

        const result = await messageService.getSentMessages(sentUsername);

        expect(result.success).toBe(true);
        expect(result.message).toEqual(mockMessages);
        expect(Message.find).toHaveBeenCalledWith({ username: sentUsername, type: 'compose' });
    });

    it('should return empty array if no sent messages found', async () => {
        const sentUsername = 'testUser';
        const mockUser = { username: sentUsername };
        UserModel.findOne.mockResolvedValue(mockUser);
        Message.find.mockResolvedValue([]);

        const result = await messageService.getSentMessages(sentUsername);

        expect(result.success).toBe(true);
        expect(result.message).toEqual([]);
        expect(Message.find).toHaveBeenCalledWith({ username: sentUsername, type: 'compose' });
    });

    it('should return error if user not found', async () => {
        const sentUsername = 'nonExistentUser';
        UserModel.findOne.mockResolvedValue(null);

        const result = await messageService.getSentMessages(sentUsername);

        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found.');
        expect(Message.find).not.toHaveBeenCalled();
    });

    it('should return error if retrieving sent messages fails', async () => {
        const sentUsername = 'testUser';
        const mockUser = { username: sentUsername };
        UserModel.findOne.mockResolvedValue(mockUser);
        Message.find.mockRejectedValue(new Error('Failed to retrieve messages'));

        const result = await messageService.getSentMessages(sentUsername);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Failed to get sent message.');
        expect(Message.find).toHaveBeenCalledWith({ username: sentUsername, type: 'compose' });
    });
});

describe('messageService - markMessageUnread', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should mark message as unread successfully', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const mockMessage = { recipient: userID, status: 'read' };
        const mockUser = { username: userID };
        UserModel.findOne.mockResolvedValue(mockUser);
        Message.findOne.mockResolvedValue(mockMessage);
        Message.findOneAndUpdate.mockResolvedValue({});

        const result = await messageService.markMessageUnread(userID, messageId);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Message unread successfully.');
        expect(Message.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: messageId },
            { $set: { status: 'delivered' } },
            { runValidators: true }
        );
    });

    it('should return error if message ID is null', async () => {
        const userID = 'testUser';
        const messageId = null;

        const result = await messageService.markMessageUnread(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('message Id is null.');
        expect(UserModel.findOne).not.toHaveBeenCalled();
        expect(Message.findOne).not.toHaveBeenCalled();
        expect(Message.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('should return error if message not found', async () => {
        const userID = 'testUser';
        const messageId = 'nonExistentMessageId';
        UserModel.findOne.mockResolvedValue({});
        Message.findOne.mockResolvedValue(null);

        const result = await messageService.markMessageUnread(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Message not found.');
        expect(Message.findOneAndUpdate).not.toHaveBeenCalled();
    });


});

describe('messageService - markMessageRead', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should mark message as read successfully', async () => {
        const userID = 'testUser';
        const messageId = 'testMessageId';
        const mockMessage = { recipient: userID, status: 'delivered' };
        const mockUser = { username: userID };
        UserModel.findOne.mockResolvedValue(mockUser);
        Message.findOne.mockResolvedValue(mockMessage);
        Message.findOneAndUpdate.mockResolvedValue({});

        const result = await messageService.markMessageRead(userID, messageId);

        expect(result.success).toBe(true);
        expect(result.message).toBe('Message read successfully.');
        expect(Message.findOneAndUpdate).toHaveBeenCalledWith(
            { _id: messageId },
            { $set: { status: 'read' } },
            { runValidators: true }
        );
    });

    it('should return error if message ID is null', async () => {
        const userID = 'testUser';
        const messageId = null;

        const result = await messageService.markMessageRead(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('message Id is null.');
        expect(UserModel.findOne).not.toHaveBeenCalled();
        expect(Message.findOne).not.toHaveBeenCalled();
        expect(Message.findOneAndUpdate).not.toHaveBeenCalled();
    });

    it('should return error if message not found', async () => {
        const userID = 'testUser';
        const messageId = 'nonExistentMessageId';
        UserModel.findOne.mockResolvedValue({});
        Message.findOne.mockResolvedValue(null);

        const result = await messageService.markMessageRead(userID, messageId);

        expect(result.success).toBe(false);
        expect(result.error).toBe('Message not found.');
        expect(Message.findOneAndUpdate).not.toHaveBeenCalled();
    });

});

describe('messageService - markAllMessagesRead', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should mark all messages as read successfully', async () => {
        const userID = 'testUser';
        const mockUser = { username: userID };
        const mockMessages = [{ _id: '1', recipient: userID, status: 'delivered' }];
        UserModel.findOne.mockResolvedValue(mockUser);
        Message.find.mockResolvedValue(mockMessages);
        Message.updateMany.mockResolvedValue({});

        const result = await messageService.markAllMessagesRead(userID);

        expect(result.success).toBe(true);
        expect(result.message).toBe('All Message readed successfully.');
        expect(Message.updateMany).toHaveBeenCalledWith(
            { recipient: userID, status: 'delivered' },
            { $set: { status: 'read' } }
        );
    });

    it('should return error if user not found', async () => {
        const userID = 'nonExistentUser';
        UserModel.findOne.mockResolvedValue(null);

        const result = await messageService.markAllMessagesRead(userID);

        expect(result.success).toBe(false);
        expect(result.error).toBe('User not found.');
        expect(Message.find).not.toHaveBeenCalled();
        expect(Message.updateMany).not.toHaveBeenCalled();
    });


   
});



  

