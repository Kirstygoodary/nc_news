const selectUsers = require("../models/usersModel");

const sendUsers = (req, res, next) => {
  const { username } = req.params;

  selectUsers(username)
    .then(user => {
      return res.status(200).send({ user: user[0] });
    })
    .catch(next);
};

const putUsers = (req, res, next) => {
  return res.sendStatus(405); // Not allowed
};

module.exports = { sendUsers, putUsers };
