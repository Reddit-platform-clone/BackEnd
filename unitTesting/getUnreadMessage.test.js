const messageService = require('../services/messageService');
const messageController = require('../controllers/messageController');
const jwt = require('jsonwebtoken');

jest.mock('../services/messageService');
jest.mock('jsonwebtoken');

describe('Message Controller', () => {
    describe('getInboxMessages', () => {
        it('should retrieve inbox messages successfully', async () => {
            const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0';
           
            const req = {
                headers: {
                    authorization: token
                }
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            };

            
       

            const mockInboxMessages = [
                {
                    status: "sent",
                    report: false,
                    reportDetails: null,
                    _id: "66024a20b98ea4302462f5ad",
                    username: "abdallah",
                    recipient: "zyad",
                    title: "ss",
                    content: "This is a test message.",
                    dateTime: "2024-03-26T04:08:00.022Z",
                    __v: 0
                }
            ];

            messageService.getInboxMessages.mockResolvedValue(mockInboxMessages);

            await messageController.getInboxMessages(req, res);

            
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockInboxMessages);
        });

    });
});
