import 'dotenv/config'

import request from 'supertest';
import app from "../.."
import models from '../../models';
import jwt from 'jsonwebtoken'

const { User } = models

describe('Auth Controller', () => {

  afterAll(async () => {
    // Clean up any resources after all tests have finished
    await User.destroy({where: {email:'johndoe@example.com'}});
  });

  describe('POST /Signup', () => {
    it('should register a new user', async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(user);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('name', 'John Doe');
      expect(response.body).toHaveProperty('email', 'johndoe@example.com');
    });

    it('should return an error if user already exists', async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(user);

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errors[0]).toHaveProperty('message', 'User already exists');
    });

    it('should return an error for missing name field', async () => {
      const user = {
        email: 'test@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(user);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errorMessage).toBe('null value in column "name" of relation "Users" violates not-null constraint');
    });

    it('should return an error for missing email field', async () => {
      const user = {
        name: 'Test User',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/signup')
        .send(user);

        expect(response.statusCode).toBe(500);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errorMessage).toBe('WHERE parameter "email" has invalid "undefined" value');
    });

    it('should return an error for missing password field', async () => {
      const user = {
        name: 'Test User',
        email: 'test@example.com'
      };

      const response = await request(app)
      .post('/auth/signup')
      .send(user);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errorMessage).toBe('data and salt arguments required');
    });
  });

  describe('POST /Login', () => {

    it('should log in a user and return a JWT token', async () => {
      const userCredentials = {
        email: 'johndoe@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(userCredentials);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('token');

      const decoded = jwt.verify(response.body.token, process.env.JWTSECRET);
      expect(decoded).toHaveProperty('id');
      expect(decoded.email).toBe(userCredentials.email);
    });

    it('should return an error for incorrect password', async () => {
      const userCredentials = {
        email: 'johndoe@example.com',
        password: 'incorrectpassword'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(userCredentials);

      expect(response.body.errors.status).toBe(401);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errorMessage).toBe('Unauthorized');
    });
    it('should return an error for non-existent user', async () => {
      const userCredentials = {
        email: 'nonexistentuser@example.com',
        password: 'password123'
      };

      const response = await request(app)
        .post('/auth/login')
        .send(userCredentials);

      expect(response.body.errors.status).toBe(401);
      expect(response.body).toHaveProperty('errors');
      expect(response.body.errorMessage).toBe('Unauthorized');
    });

  });

  describe('Token Verification API', () => {
    it('should verify a valid token and return isValid as true', async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      };
      const token = jwt.sign(user, process.env.JWTSECRET);

      const response = await request(app)
        .get('/auth/verify')
        .set('x-auth-token', `${token}`);

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty('isValid', true);
    });

    it('should return invalid signature for an invalid token', async () => {
      const user = {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123'
      };
      const invalidToken = jwt.sign(user, 'FakeSecret');
      const response = await request(app)
      .get('/auth/verify')
      .set('x-auth-token', `${invalidToken}`);

      expect(response.statusCode).toBe(500);
      expect(response.body).toHaveProperty('errorMessage', 'invalid signature');
    });
  });

});
