const messageService = require('../services/messageService');
const messageController = require('../controllers/messageController');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel');

jest.mock('../services/messageService');
jest.mock('../models/userModel');
jest.mock('express-validator');

describe('Message Controller', () => {
    describe('unread', () => {
        it('should successfully unread a message', async () => {
           
            const req = {
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'
                },
                body: {
                    "_id": "6602520fb98ea4302462f5bf"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

        
            
            messageService.composeMessage.mockResolvedValue({ success: true, message: 'Message unread successfully.' });

            
            await messageController.compose(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Message unread successfully.' });
        });
    });
});