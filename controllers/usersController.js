const selectUsers = require("../models/usersModel");

const sendUsers = (req, res, next) => {
  const params = req.params;
  console.log(params, "params");
  console.log("In the users Controller");
  selectUsers()
    .then(users => res.status(200).send({ users }))
    .catch(function(err) {
      console.log(err, "<<<error in selectUsers");
    });
};

module.exports = sendUsers;
