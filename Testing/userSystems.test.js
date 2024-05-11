require('dotenv').config();

const request = require('supertest');
const { default: test } = require('node:test');
const jwt = require('jsonwebtoken');

const testUser = 'testuser' + Date.now();
const email = testUser + '@gmail.com';
const password = '145'
const token = jwt.sign({ username: testUser }, process.env.SECRET_ACCESS_TOKEN);

describe('Signup, signin, and check username availability', () => {
    it('should register a new user', async () => {
        const response = await request('http://localhost:5000')
            .post('/api/signup')
            .send({
                username: testUser,
                password: password,
                email: email
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
        await request('http://localhost:5000')
        .post('/api/signup')
        .send({
            username: testUser2,
            password: password,
            email: email2
        });
    })

    it('should not register an existing user', async () => {
        const response = await request('http://localhost:5000')
            .post('/api/signup')
            .send({
                username: testUser,
                password: password,
                email: email
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not register a user with missing username', async () => {
        const response = await request('http://localhost:5000')
            .post('/api/signup')
            .send({
                password: password,
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not register a user with missing password', async () => {
        const response = await request('http://localhost:5000')
            .post('/api/signup')
            .send({
                username: testUser,
            });
        expect(response.statusCode).toBe(400);
    }),

    it ('should check if username is not available', async () => {
        const res = await request('http://localhost:5000/')
            .get('api/username_available/' + testUser)
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Username is not available');
    }),

    it ('should check if username is available', async () => {
        const res = await request('http://localhost:5000/')
            .get('api/username_available/testuser')
        expect(res.statusCode).toEqual(200);
        expect(res.body.message).toEqual('Username is available');
    }),

    it('should login an existing user using username', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/login')
            .send({
                emailOrUsername: testUser,
                password: password
            });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');   
    }),

    it('should not login a non-existing user', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/login')
            .send({
                emailOrUsername: testUser + 'felforn',
                password: password
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not login a user with wrong password', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/login')
            .send({
                emailOrUsername: testUser,
                password: '123'
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not login a user with missing username', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/login')
            .send({
                password: '123'
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should not login a user with missing password', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/login')
            .send({
                username: 'kofta 3alfa7m'
            });
        expect(response.statusCode).toBe(400);
    }),

    it('should login an existing user using email', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/login')
            .send({
                emailOrUsername: email,
                password: password
            });
        expect(response.statusCode).toBe(200);
    }),

    it('should report a user', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/report_user')
            .send({ 
                reported: 'Red_Cat_39',
                details: 'This is a test report' 
            })
            .set('Authorization', 'Bearer ' + token);
        const batates = 'baatates';
        expect(response.statusCode).toBe(200);
    }),

    it('should not report a user with missing an unauthorized token', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/report_user')
            .send({
                usernameToBlock: 'wael'
            });
        expect(response.statusCode).toBe(401);
    }),

    it('should block a user', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/block_user')
            .send({ usernameToBlock: 'Red_Cat_39' })
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
    }),

    it('should not block a user with missing an unauthorized token', async () => {
        const response = await request('http://localhost:5000/')
            .post('api/block_user')
            .send({
                usernameToBlock: 'Red_Cat_39'
            });
        expect(response.statusCode).toBe(401);
    }),

    it('should get info of a friend', async () => {
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/Red_Cat_39')
            .set('Authorization', 'Bearer ' + token);

        expect(response.statusCode).toBe(200);
    }),

    it('should not get a friend info with request missing authorization token', async () => {
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/Red_Cat_39');
        expect(response.statusCode).toBe(401);
    }),

    it('should not get info with request with invalid token', async () => {
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/Red_Cat_39')
            .set('Authorization', 'Bearer ' + 'invalid token');

        expect(response.statusCode).toBe(403);  
    }),

    it('should not get infor of a user who is not a friend', async () => {
        const response = await request('http://localhost:5000/')
            .get('api/v1/me/friends/zyad')
            .set('Authorization', 'Bearer ' + token);

        expect(response.statusCode).toBe(400);
    }),

    it('should remove a friend', async () => {
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/Red_Cat_39')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
    }),

    it('should not remove a friend if not authorized', async () => {
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/username');
        expect(response.statusCode).toBe(401);
    }),

    it('should not remove a user who is not a friend of the authorized user', async () => {
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/abdallah')
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(400);
    }),

    it('should not remove a friend if token is invalid', async () => {
        const response = await request('http://localhost:5000/')
            .delete('api/v1/me/friends/wael')
            .set('Authorization', 'Bearer ' + 'invalid token');
        expect(response.statusCode).toBe(403);
    })
})