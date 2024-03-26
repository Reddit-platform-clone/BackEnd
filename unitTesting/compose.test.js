const messageService = require('../services/messageService');
const messageController = require('../controllers/messageController');
const { validationResult } = require('express-validator');
const UserModel = require('../models/userModel');

jest.mock('../services/messageService');
jest.mock('../models/userModel');
jest.mock('express-validator');

describe('Message Controller', () => {
    describe('compose', () => {
        it('should successfully compose and send a message', async () => {
           
            const req = {
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'
                },
                body: {
                    recipient: 'abdallah',
                    title: 'Test Title',
                    content: 'Test Content'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            
            

            
           

            
            messageService.composeMessage.mockResolvedValue({ success: true, message: 'Message sent successfully.' });

            
            await messageController.compose(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: 'Message sent successfully.' });
        });
        it('should return an error if recipient and sender same', async () => {
            const req = {
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'
                },
                body: {
                    recipient: 'zyad',
                    title: 'Test Title',
                    content: 'Test Content'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        
           
        
            
            
        
            
            messageService.composeMessage.mockResolvedValue({ success: false, errors: [{ msg: 'Sender and recipient cannot be the same.' }] });
        
            
            await messageController.compose(req, res);
        
            
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'Sender and recipient cannot be the same.' }] });
        });
        
        it('should return an error if recipient doesnt exist', async () => {
            const req = {
                headers: {
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'
                },
                body: {
                    recipient: 'not exist',
                    title: 'Test Title',
                    content: 'Test Content'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        
           
        
            
            
        
            messageService.composeMessage.mockResolvedValue({ success: false, errors: [{ msg: 'receiver does not exist.' }] });
        
            
            await messageController.compose(req, res);
        
           
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: 'receiver does not exist.' }] });
        });
        it('should return an error if sender doesnt exist', async () => {
            const req = {
                headers: {
                    //wrong token
                    authorization: 'Bearer eyJhbGciOiJIUzI1NiIsdInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'
                },
                body: {
                    recipient: 'not exist',
                    title: 'Test Title',
                    content: 'Test Content'
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };
        
           
        
            
            
        
            messageService.composeMessage.mockResolvedValue({ success: false, errors: [{ msg:"Failed to send message." }] });
        
            
            await messageController.compose(req, res);
        
           
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({ errors: [{ msg: "Failed to send message." }] });
        });

        });
});