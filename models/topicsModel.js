const connection = require("../db/connection");

const selectTopics = () => {
  //console.log("<<<<<<< in the topics Model");

  return connection()
    .select("*")
    .from("topics")
    .then(results => console.log(results, "<<<<<< results in Model"));
};

module.exports = selectTopics;
