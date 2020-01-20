const selectAuthor = author => {
  return connection
    .select("*")
    .from("articles")
    .modify(function(currentQuery) {
      /**
       * here -> if there is a query for a topic, the
       * model will add additional functionality to check if the 'slug' corresponds with the query
       */
      if (author) {
        currentQuery.where("articles.author", author);
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
