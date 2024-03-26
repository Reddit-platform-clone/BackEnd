const request = require('supertest');
const app = require('../server');

describe('GET /api/username_available', () => {
    it ('should check if username is available', async () => {
        const res = await request(app)
            .get('/api/username_available')
            .send({ username: 'testuser' });
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Username is available');
    }),

    it ('should check if username is not available', async () => {
        const res = await request(app)
            .get('/api/username_available')
            .send({ username: 'zyad' });
        expect(res.statusCode).toEqual(400);
    })
})