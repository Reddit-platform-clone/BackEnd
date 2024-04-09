const request = require('supertest');
// const app = require('../server');

describe('POST /api/block_user', () => {
    it('should block a user', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlYm9AZ21haWwuY29tIiwiaWF0IjoxNzEyMDU5ODY3fQ.NV5opXmReq0vo-LVrvT6OiQsthwrAM6mAJEfajYVPto'
        const response = await request('http://localhost:5000/')
            .post('api/block_user')
            .send({ usernameToBlock: 'wael' })
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
    }, 20000),

    it('should not block a user with missing an unauthorized token', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/block_user')
            .send({
                usernameToBlock: 'wael'
            });
        expect(response.statusCode).toBe(401);
    })
})