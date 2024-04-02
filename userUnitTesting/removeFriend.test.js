const request = require('supertest');
// const app = require('../server');

describe('POST /api/v1/me/friends/:username', () => {
    it('should remove a friend', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvZnRhIDNhbGZhN20iLCJpYXQiOjE3MTE0OTkxNDZ9.vEvVmG0O5d39fPB9aApiYvyFI5wqrHwtq87v68wxHSs'
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/abdallah')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
    }, 20000),

    it('should not remove a friend if not authorized', async () => {
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/username');
        expect(response.statusCode).toBe(401);
    })
})