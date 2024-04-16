const request = require('supertest');
// const app = require('../server'); 

describe('POST /message/compose', () => {
  it('should compose a new message', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'; 
    const messageData = {
        recipient: 'abdallah',
        title: 'Test Title',
        content: 'Test Content'
    };

    const response = await request('http://localhost:5000/')
      .post('message/compose')
      .set('Authorization', token)
      .send(messageData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message sent successfully.');

  });
});