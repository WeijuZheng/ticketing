import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
    namespace NodeJS {
        interface Global {
            generateCookie(id?: string): string[];
        }
    }
}

jest.mock('../natsWrapper'); 

// enter the api key for local test
process.env.STRIPE_KEY='STRIPE_API_KEY';

let mongo: any;
beforeAll(async () => {
    process.env.JWT_KEY = 'asdf';
    mongo = new MongoMemoryServer();
    const mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

beforeEach(async () => {
    jest.clearAllMocks();
    const collections = await mongoose.connection.db.collections();

    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
});

global.generateCookie = (id?: string) => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: id || new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com'
    };

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build sesion object {jwt: my_jwt}
    const session = {jwt: token};

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // return a string thats the cookie with the encoded data
    // supertest put all the cookie in an array
    return [`express:sess=${base64}`];
};