const db = require('../models');
const User = db.user;

checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Check username
  User.findOne({
    username: req.body.username
  }).exec((err, user) => {
    if (err) {
      res.status(500).send({message: err});
      return;
    }

    if (user) {
      res.status(400).send({message: 'Username already in use!'});
      return;
    }

    next();
  });
};

const verifySignUp = {checkDuplicateUsernameOrEmail};

module.exports = verifySignUp;