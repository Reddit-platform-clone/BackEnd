
const request = require('supertest');
const app = require('../server'); 

describe('DELETE /message/del_msg', () => {
  it('should delete a  message', async () => {
    const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inp5YWQiLCJpYXQiOjE3MTE0MTc1NjZ9.3VJdo_nz1cHd7nVAdizTCILET4FTMyjz8b7VpVsXJh0'; 
    const messageData = {
        _id: "66024a20b98ea4302462f5ad"
    };

    const response = await request(app)
      .delete('/message/del_msg')
      .set('Authorization', token)
      .send(messageData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'Message deleted successfully.');

  });
});