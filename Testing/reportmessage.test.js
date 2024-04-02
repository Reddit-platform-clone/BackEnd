
const request = require('supertest');
// const app = require('../server'); 

describe('POST /api/report_msge', () => {
  it('should report a  message', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0';
    const messageData = {
        _id: "66027496b4d8270e5c5a0684",
        reportDetails:"vioal"
    };

    const response = await request('http://localhost:5000/')
      .post('api/report_msg')
      .set('Authorization', token)
      .send(messageData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message reported successfully.');

  });
});