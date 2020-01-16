const connection = require("../db/connection");

const selectTopics = () => {
  //console.log("<<<<<<< in the topics Model");

  return connection
    .select("*")
    .from("topics")
    .then(results => {
      // console.log(results);
      if (null) {
        return Promise.reject({
          status: 404,
          msg: "Not found"
        });
      }
      // console.log(results, "<<<<<< results in Model");
      return results;
    });
};

module.exports = selectTopics;
