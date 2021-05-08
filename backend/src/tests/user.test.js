import mongoose from 'mongoose';
const db = require('../models');
const User = db.user;

describe('User Model Testing', () => {
  let connection;
  let db;

  beforeAll(async () => {
    const connectionString = `mongodb+srv://admin:Group19OrangeOx@cluster0.7szcs.mongodb.net/TestDB?retryWrites=true&w=majority`
    connection = await mongoose.connect(connectionString, {
      useNewUrlParser: true
    });
  });

  beforeEach(async () => {
    const coll = await mongoose.connection.db.createCollection('users');
    const user1 = {
      username: 'Test',
      password: 'Password'
    };
    await coll.insertMany([user1]);
  });

  afterEach(async () => {
    await mongoose.connection.db.dropCollection('users');
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should insert user into collection', async () => {
    const user = new User({username: 'NewTest', password: 'Password'});
    const savedUser = await user.save();
    
    const foundUsers = await User.find({});
    expect(foundUsers.length).toBe(2);
  });
});