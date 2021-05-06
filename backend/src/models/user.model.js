import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  friendRequests: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;