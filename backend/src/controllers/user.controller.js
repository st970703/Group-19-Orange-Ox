const db = require('../models');
const User = db.user;

// /api/user/all
// Does not require any authentication
exports.allAccess = (req, res) => {
  res.status(200).send('Public Content');
};

// /api/user/profile
// Requires 'x-access-token' in header, along with JWT
exports.userProfile = (req, res) => {
  User.findById(req.userId, (err, user) => {
    if (err) {
      res.status(404).send({message: 'User not found'});
    } else {
      res.json(user);
    }
  });
};

// /api/user/update
// Requires 'x-access-token' in header, along with JWT
exports.updateUser = (req, res) => {
  console.log(req.body, req.userId);
  User.findByIdAndUpdate({_id: req.userId}, {...req.body}, {new: true, useFindAndModify: false}, (err, result) => {
    if (err) {
      res.status(404).send({message: 'Could not update user'});
    } else {
      res.send(result);
    }
  });
}

// /api/user/delete
// Requires 'x-access-token' in header, along with JWT
exports.deleteUser = (req, res) => {
  User.deleteOne({_id: req.userId}, (err) => {
    if (err) {
      res.status(404).send({message: 'Error deleting user'});
    } else {
      res.status(200).send({message: 'User deleted'});
    }
  });
}