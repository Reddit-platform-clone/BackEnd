const messageService = require('../services/messageService');
const messageController = require('../controllers/messageController');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel');

jest.mock('../services/messageService');
jest.mock('../models/userModel');
jest.mock('express-validator');

describe('Message Controller', () => {
    describe('delete', () => {
        it('should successfully delete  a message', async () => {
           
            const req = {
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'
                },
                body: {
                    "_id": "66027496b4d8270e5c5a0684"
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

        
            
            messageService.deleteMessage.mockResolvedValue({ success: true, message: 'Message deleted successfully.' });

            
            await messageController.deleteMessage(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Message deleted successfully.' });
        });
        

        });
});