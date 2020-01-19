const connection = require("../db/connection");

const selectTopics = topic => {
  return connection
    .select("*")
    .from("topics")
    .modify(function(currentQuery) {
      /**
       * here -> if there is a query for a topic, the
       * model will add additional functionality to check if the 'slug' corresponds with the query
       */
      if (topic) {
        console.log("Overriding topic in the model with:", topic);

        currentQuery.where("topics.slug", topic);
      }
    })
    .then(results => {
      if (results.length === 0) {
        console.log("executed promise reject");
        return Promise.reject({
          status: 404,
          msg: "Not found"
        });
      }

      return results;
    });
};

module.exports = selectTopics;
