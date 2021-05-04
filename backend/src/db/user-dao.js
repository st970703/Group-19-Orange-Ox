/** This file contains the CRUD functions for the Users collection in MongoDb
 *  Creating the user is handled by Auth0's Create script
 */
import {User} from './user-schema';
import connectToDatabase from './db-connect';

export async function createUser(user) {
  const dbUser = new User(user);
  await dbUser.save();
  return dbUser;
}

export async function retrieveAllUsers() {
  const MongoClient = require('mongodb@3.1.4').MongoClient;
  const client = new MongoClient('mongodb+srv://admin:' + configuration.MONGO_PASSWORD + '@cluster0.7szcs.mongodb.net/?retryWrites=true&w=majority');

  client.connect((err) => {
    if (err) console.log(err);
    const db = client.db('DefaultDB');
    const users = db.collection('Users');
    return users.find({});
  });
}

export async function retrieveUser(email) {
  return User.findOne({email: email});
}