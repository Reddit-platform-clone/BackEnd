const request = require('supertest');
// const app = require('../server');

describe('DELETE /api/v1/me/friends/:username', () => {
    it('should remove a friend', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlYm9AZ21haWwuY29tIiwiaWF0IjoxNzEyMDU5ODY3fQ.NV5opXmReq0vo-LVrvT6OiQsthwrAM6mAJEfajYVPto'
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/wael')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
    }, 20000),

    it('should not remove a friend if not authorized', async () => {
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/username');
        expect(response.statusCode).toBe(401);
    }),

    it('should not remove a user who is not a friend of the authorized user', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlYm9AZ21haWwuY29tIiwiaWF0IjoxNzEyMDU5ODY3fQ.NV5opXmReq0vo-LVrvT6OiQsthwrAM6mAJEfajYVPto'
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/abdallah')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(400);
    }, 20000),

    it('should not remove a friend if token is invalid', async () => {
        token = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlYm9AZ21haWwuY29tIiwiaWF0IjoxNzEyMDU5ODY3fQ.NV5opXmReq0vo-LVrvT6OiQsthwrAM6mAJEfajYVPto'
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/wael')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(403);
    }, 20000)
})