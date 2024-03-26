const request = require('supertest');
const app = require('../server');

describe('GET /message/inbox', () => {
  it('should retrieve inbox messages', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'; // Replace with a valid token for testing

    const response = await request(app)
      .get('/message/inbox')
      .set('Authorization', token);

   
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(2); 
    expect(response.body[0]).toHaveProperty('_id');
    expect(response.body[0]).toHaveProperty('username', 'abdallah');
    expect(response.body[0]).toHaveProperty('recipient', 'zyad');
    expect(response.body[0]).toHaveProperty('title', 'ss');
    expect(response.body[0]).toHaveProperty('content', 'This is a test message.');
    expect(response.body[0]).toHaveProperty('dateTime');
    expect(response.body[1]).toHaveProperty('_id');
    expect(response.body[1]).toHaveProperty('username', 'abdallah');
    expect(response.body[1]).toHaveProperty('recipient', 'zyad');
    expect(response.body[1]).toHaveProperty('title', 's');
    expect(response.body[1]).toHaveProperty('content', 'This is a test message.');
    expect(response.body[1]).toHaveProperty('dateTime');
   
  });
});
