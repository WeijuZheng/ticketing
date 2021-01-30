import request from 'supertest';
import { app } from '../../app';

it('returns a 400 with an invalid email', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'testtest.com',
            password: 'password'
        })
        .expect(400);
});

it('returns a 400 with an invalid password', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: ''
        })
        .expect(400);
});

it('returns a 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signin')
        .send({
            password: 'password'
        })
        .expect(400);
});

it('fails when an email that does not exist is supply', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'asdasd'
        })
        .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200);
    
    expect(response.get('Set-Cookie')).toBeDefined();
});