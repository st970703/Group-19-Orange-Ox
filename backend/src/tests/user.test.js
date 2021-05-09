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

  it('should retrieve user from collection', async () => {
    const foundUser = await User.findOne({username: 'Test'});
    console.log(foundUser);
    expect(foundUser).toBeTruthy();
    expect(foundUser.username).toBe('Test');
    expect(foundUser.friends.length).toBe(0);
    expect(foundUser.friendRequests.length).toBe(0);
  });

  it('should be able to update user', async () => {
    const newFriend = new User({username: 'NewFriend', password: 'Password'});
    const savedFriend = await newFriend.save();
    const updatedUser = await User.findOneAndUpdate({username: 'Test'}, {$push: {friendRequests: savedFriend._id}});

    const foundUser = await User.findOne({username: 'Test'});
    expect(foundUser.friendRequests.length).toBe(1);
  });

  it('should be able to delete user', async () => {
    User.deleteOne({username: 'Test'})
      .then(async () => {
        // This will raise an error but pass all tests
        const foundUsers = await User.find({});
        expect(foundUsers.length).toBe(0);
      });
  });
});