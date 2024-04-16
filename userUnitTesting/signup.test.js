const request = require('supertest');
// const app = require('../server');
const { default: test } = require('node:test');

describe('POST /signup', () => {
    it('should register a new user', async () => {
        testUser = 'testuser' + Date.now();
        const response = await request('http://localhost:5000/')
            .post('signup')
            .send({
                username: testUser,
                password: '145'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    })

    it('should not register an existing user', async () => {
        const response = await request('http://localhost:5000/')
            .post('signup')
            .send({
                username: 'kofta 3alfa7m',
                password: '145'
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not register a user with missing username', async () => {
        const response = await request('http://localhost:5000/')
            .post('signup')
            .send({
                password: '123'
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not register a user with missing password', async () => {
        const response = await request('http://localhost:5000/')
            .post('signup')
            .send({
                username: 'kofta 3alfa7m'
            });
        expect(response.statusCode).toBe(400);
    })
})