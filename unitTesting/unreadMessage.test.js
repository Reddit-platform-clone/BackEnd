
const request = require('supertest');
const app = require('../server'); 

describe('POST /api/unread_message', () => {
  it('should successfully read all messages', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0';
    const messageData = {
        _id: "660253d56fbff33c7846ac3f"
    };


    const response = await request(app)
      .post('/api/unread_message')
      .set('Authorization', token).send(messageData);
    expect(response.body).toHaveProperty('message', 'Message unread successfully.');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message unread successfully.');

  });
});