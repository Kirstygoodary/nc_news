const connection = require("../db/connection");

selectUsers = author => {
  return connection
    .select("*")
    .from("users")
    .modify(function(currentQuery) {
      if (author) {
        currentQuery.where("users.username", author);
      }
    })
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Not found"
        });
      }
      return results;
    });
};

module.exports = selectUsers;
