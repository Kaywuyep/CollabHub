const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRoutes = require('../../routes/userRoutes');
const User = require('../../models/usermodel');

const app = express();
app.use(bodyParser.json());
app.use('/api/users', userRoutes);

// Mocking the User model
jest.mock('../../models/usermodel');

describe('User Controller', () => {
    beforeAll(async () => {
        // Mocking mongoose connection if needed
        await mongoose.connect('mongodb://localhost:27017/testdb', { useNewUrlParser: true, useUnifiedTopology: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('GET /v1/api/users/', () => {
        it('should return all users', async () => {
            User.find = jest.fn().mockResolvedValue([{ username: 'testuser' }]);

            const res = await request(app).get('/api/users/');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([{ username: 'testuser' }]);
        });

        it('should handle errors', async () => {
            User.find = jest.fn().mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/v1/api/users/');
            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Database error');
        });
    });

    describe('GET /v1/api/users/:id', () => {
        it('should return a user profile', async () => {
            const mockUser = { _id: '123', username: 'testuser' };
            User.findOne = jest.fn().mockResolvedValue(mockUser);
            User.findById = jest.fn().mockResolvedValue(mockUser);

            const res = await request(app).get('/v1/api/users/123');
            expect(res.status).toBe(200);
            expect(res.body).toEqual(mockUser);
        });

        it('should return 400 if user not found', async () => {
            User.findOne = jest.fn().mockResolvedValue(null);

            const res = await request(app).get('/v1/api/users/123');
            expect(res.status).toBe(400);
            expect(res.body.message).toBe('User does not Exist!!');
        });

        it('should handle errors', async () => {
            User.findOne = jest.fn().mockRejectedValue(new Error('Database error'));

            const res = await request(app).get('/v1/api/users/123');
            expect(res.status).toBe(500);
            expect(res.body.message).toBe('Database error');
        });
    });

    // Similar tests can be written for registerUser, loginUser, updateById, and deleteUsers
});
