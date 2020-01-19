const selectUsers = require("../models/usersModel");

const sendUsers = (req, res, next) => {
  const params = req.params;

  selectUsers()
    .then(users => {
      return res.status(200).send({ users });
    })
    .catch(function(err) {});
};

module.exports = sendUsers;
