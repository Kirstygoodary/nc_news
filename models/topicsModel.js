const connection = require("../db/connection");

const selectTopics = () => {
  console.log("<<<<<<< in the topics Model", connection);

  return connection
    .select("*")
    .from("topics")
    .then(results => {
      console.log(results, "<<<<<< results in Model");
      return results;
    });
};

module.exports = selectTopics;
