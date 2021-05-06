exports.allAccess = (req, res) => {
  res.status(200).send('Public Content');
};

exports.userProfile = (req, res) => {
  res.status(200).send('User Content');
};