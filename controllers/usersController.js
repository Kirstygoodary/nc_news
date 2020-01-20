const selectUsers = require("../models/usersModel");

const sendUsers = (req, res, next) => {
  const { username } = req.params;
  console.log(req.params);

  console.log(username, "AUTHOR");

  selectUsers(username)
    .then(user => {
      return res.status(200).send({ user: user[0] });
    })
    .catch(next);
};

const putUsers = (req, res, next) => {
  console.log("here");

  return res.sendStatus(405); // Send the response.
};

module.exports = { sendUsers, putUsers };
