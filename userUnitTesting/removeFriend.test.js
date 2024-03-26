const request = require('supertest');
const app = require('../server');

describe('POST /api/v1/me/friends/:username', () => {
    it('should remove a friend', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvZnRhIDNhbGZhN20iLCJpYXQiOjE3MTE0ODczOTN9.ls_1FK78CYqVj6qr5E55nw1AyEA9o2RlIdi9_UDbbb0'
        const response = await request(app)
            .delete('/api/v1/me/friends/zyad')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
    }),

    it('should not remove a friend if not authorized', async () => {
        const response = await request(app)
            .delete('/api/v1/me/friends/username');
        expect(response.statusCode).toBe(401);
    })
})