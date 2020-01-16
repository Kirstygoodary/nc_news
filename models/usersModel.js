const connection = require("../db/connection");

selectUsers = params => {
  return connection
    .select("*")
    .from("users")
    .then(results => {
      return results;
    });
};

module.exports = selectUsers;
