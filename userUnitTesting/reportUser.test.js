const request = require('supertest');
const app = require('../server');

describe('POST /api/report', () => {
    it('should block a user', async () => {
        token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImtvZnRhIDNhbGZhN20iLCJpYXQiOjE3MTE0ODczOTN9.ls_1FK78CYqVj6qr5E55nw1AyEA9o2RlIdi9_UDbbb0'
        const response = await request(app)
            .post('/api/report_user')
            .send({ 
                reported: 'wael',
                details: 'This is a test report' 
            })
            .set('Authorization', 'Bearer ' + token);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
    }),

    it('should not block a user with missing an unauthorized token', async () => {
        const response = await request(app)
            .post('/api/report_user')
            .send({
                usernameToBlock: 'wael'
            });
        expect(response.statusCode).toBe(401);
    })
})