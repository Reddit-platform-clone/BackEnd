const request = require('supertest');
const app = require('../server');

describe('POST /login', () => {
    it('should login an existing user', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'kofta 3alfa7m',
                password: '145'
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');   
    }),

    it('should not login a non-existing user', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'kofta felforn',
                password: '145'
            });
        expect(response.statusCode).toBe(401);
    }),

    it('should not login a user with wrong password', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'kofta 3alfa7m',
                password: '123'
            });
        expect(response.statusCode).toBe(401);
    }),

    it('should not login a user with missing username', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                password: '123'
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not login a user with missing password', async () => {
        const response = await request(app)
            .post('/login')
            .send({
                username: 'kofta 3alfa7m'
            });
        expect(response.statusCode).toBe(400);
        
    })
})