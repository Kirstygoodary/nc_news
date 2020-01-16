const connection = require("../db/connection");

const selectTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then(results => {
      if (null) {
        return Promise.reject({
          status: 404,
          msg: "Not found"
        });
      }

      return results;
    });
};

module.exports = selectTopics;
