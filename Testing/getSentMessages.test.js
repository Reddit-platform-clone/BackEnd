const request = require('supertest');
// const app = require('../server');

describe('GET /message/sent', () => {
  it('should retrieve sent messages', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'; 

    const response = await request('http://localhost:5000/')
      .get('message/sent')
      .set('Authorization', token);

   
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(4); 
    expect(response.body[0]).toHaveProperty('_id');
    expect(response.body[0]).toHaveProperty('username', 'zyad');
    expect(response.body[0]).toHaveProperty('dateTime');
    expect(response.body[1]).toHaveProperty('_id');
    expect(response.body[1]).toHaveProperty('username', 'zyad');
    expect(response.body[1]).toHaveProperty('dateTime');
    expect(response.body[2]).toHaveProperty('_id');
    expect(response.body[2]).toHaveProperty('username', 'zyad');
    expect(response.body[2]).toHaveProperty('dateTime');
   
  });
});
