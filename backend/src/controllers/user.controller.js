const db = require('../models');
const User = db.user;

// /api/user/all
// Does not require any authentication
// Returns all registered users
exports.allAccess = (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(401).send({message: 'Could not retrieve all users'});
    } else {
      res.json(users);
    }
  });
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

// /api/user/requestFriend
// Requires requesteeId in body
// Requires 'x-access-token' in header, along with JWT
exports.requestFriend = (req, res) => {
  const requesteeId = req.body.requesteeId;
  console.log(requesteeId);
  const requesterId = req.userId;
  User.findByIdAndUpdate({_id: requesteeId}, {$push: {"friendRequests": requesterId}}, {new: true, useFindAndModify: false}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

// /api/user/acceptRequst
// Requires accepteeId in body
// Requires 'x-access-token' in header, along with JWT
exports.acceptRequest = (req, res) => {
  const accepteeId = req.body.accepteeId;
  const accepterId = req.userId;
  // Change acceptee first
  User.findByIdAndUpdate({_id: accepteeId}, {$push: {"friends": accepterId}}, {new: true, useFindAndModify: false}, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      // Change accpeter
      User.findByIdAndUpdate({_id: accepterId}, {$push: {"friends": accepteeId}, $pull: {"friendRequests": accepteeId}}, {new: true, useFindAndModify: false}, (err, result) => {
        if (err) {
          res.send(err);
          // If unable to update accepter, revert acceptee
          User.findByIdAndUpdate({_id: accepteeId}, {$pull: {"friends": accepterId}, $push: {"friendRequests": accepterId}}, {new: true, useFindAndModify: false}, (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
        } else {
          res.send(result);
        }
      });
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