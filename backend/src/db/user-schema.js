import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
});

const User = mongoose.model('Users', userSchema);

export {User};