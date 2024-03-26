const request = require('supertest');
const app = require('../server');

describe('GET /api/v1/me/friends/:username', () => {
    it('should block a user', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvZnRhIDNhbGZhN20iLCJpYXQiOjE3MTE0ODczOTN9.ls_1FK78CYqVj6qr5E55nw1AyEA9o2RlIdi9_UDbbb0'
        const response = await request(app)
            .get('/api/v1/me/friends/abdallah')
            .set('Authorization', 'Bearer ' + token);

        expect(response.statusCode).toBe(200);
    }),

    it('should not block a user with missing an unauthorized token', async () => {
        const response = await request(app)
            .get('/api/v1/me/friends/abdallah');
        expect(response.statusCode).toBe(401);
    })
})