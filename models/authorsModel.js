const selectAuthor = author => {
  return connection
    .select("*")
    .from("articles")
    .modify(function(currentQuery) {
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
