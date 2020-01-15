const connection = require("../db/connection");

selectUsers = params => {
  //console.log("in the users Model");

  return connection
    .select("*")
    .from(params)
    .then(results => {
      console.log(results, "<<<results for user in Model");
      return results;
    });
};

module.exports = selectUsers;
