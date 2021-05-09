import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

// Salt factor used by bcrypt to salt the password
const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  friends: [{type: Schema.Types.ObjectId, ref: 'User'}],
  friendRequests: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

userSchema.pre('save', function(next) {
  let user = this;

  console.log(user);

  // Only hash if password has been changed or is new
  if (!user.isModified('password')) return next();

  // Generate salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // Hash password using new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);

      // Override cleartext password with hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = (candiatePassword, cb) => {
  bcrypt.compare(candiatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

export {User};