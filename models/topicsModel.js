const connection = require("../db/connection");

const selectTopics = topic => {
  return connection
    .select("*")
    .from("topics")
    .modify(function(currentQuery) {
      if (topic) {
        currentQuery.where("topics.slug", topic);
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

module.exports = selectTopics;
