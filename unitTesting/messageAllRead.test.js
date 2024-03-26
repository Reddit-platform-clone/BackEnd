

const request = require('supertest');
const app = require('../server'); 

describe('POST /api/read_all_messages', () => {
  it('should successfully read all messages', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'; // Replace with a valid token for testing
 

    const response = await request(app)
      .post('/api/read_all_messages')
      .set('Authorization', token);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Messages readed successfully.');

  });
});