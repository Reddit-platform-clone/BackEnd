const request = require('supertest');
// const app = require('../server'); 

describe('POST /api/comment', () => {
  it('should sent a new comment', async () => {
    
    const token = 'Bearer eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpveiIsImlhdCI6MTcxMjczODg2OX0.PxLOy9StcnAbyzOgIJUrQpTSLFipzz6op381Xg6P4sU'; 
    const messageData = {
        recipient: '66191f99cc7a6443c8ac2c07',
        
        content: 'This is a test message'
    };

   
    const response = await request('http://localhost:5000/')
      .post('/api/comment')
      .set('Authorization', token)
      .send(messageData);
console.log(response.body);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'comment sent successfully.');

  });
});