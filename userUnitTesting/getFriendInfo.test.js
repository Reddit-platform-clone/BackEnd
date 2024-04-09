const request = require('supertest');
// const app = require('../server');

describe('GET /api/v1/me/friends/:username', () => {
    it('should get info of a friend', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlYm9AZ21haWwuY29tIiwiaWF0IjoxNzEyMDU5ODY3fQ.NV5opXmReq0vo-LVrvT6OiQsthwrAM6mAJEfajYVPto'
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/wael')
            .set('Authorization', 'Bearer ' + token);

        expect(response.statusCode).toBe(200);
    }),

    it('should not get a friend info with request missing authorization token', async () => {
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/abdallah');
        expect(response.statusCode).toBe(401);
    }),

    it('should not get info with request with invalid token', async () => {
        token = 'yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlYm9AZ21haWwuY29tIiwiaWF0IjoxNzEyMDU5ODY3fQ.NV5opXmReq0vo-LVrvT6OiQsthwrAM6mAJEfajYVPto'
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/wael')
            .set('Authorization', 'Bearer ' + token);

        expect(response.statusCode).toBe(403);  
    }),

    it('should not get infor of a user who is not a friend', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImJlYm9AZ21haWwuY29tIiwiaWF0IjoxNzEyMDU5ODY3fQ.NV5opXmReq0vo-LVrvT6OiQsthwrAM6mAJEfajYVPto'
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/abdallah')
            .set('Authorization', 'Bearer ' + token);

        expect(response.statusCode).toBe(400);
    })
})