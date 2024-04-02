const request = require('supertest');
// const app = require('../server');

describe('POST /api/block_user', () => {
    it('should block a user', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvZnRhIDNhbGZhN20iLCJpYXQiOjE3MTE0OTkxNDZ9.vEvVmG0O5d39fPB9aApiYvyFI5wqrHwtq87v68wxHSs'
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