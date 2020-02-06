const connection = require("../db/connection");

const selectArticles = (
  username,
  topic,
  sort_by = "created_at",
  order = "desc"
) => {
  return (
    connection
      .select("articles.*")
      .from("articles")
      .count({ comment_count: "comments.comment_id" })
      .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
      .groupBy("articles.article_id")
      /**Using groupBy to avoid duplicate rows, this
       * prevents comments.article_id from being
       * hidden
       */
      .modify(function(currentQuery) {
        /**
         * Here we are adding flexibility to our
         * functionality, therefore, if username
         * or topic was not queried by the client
         * The model will not execute the if else
         * statement.
         *
         * If there is a query, the Model will check
         * whether the username matches
         * articles.author.
         *
         * This is the same for the topics conditional
         * statement.
         */
        if (username) {
          currentQuery.where("articles.author", username);
        } else {
          if (topic) {
            currentQuery.where("articles.topic", topic);
          }
        }
      })
      /**
       * Order and sort_by have default settings, unless
       * the client selects otherwise.
       */
      .orderBy(sort_by, order)
      .then(results => {
        if (results.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Request does not exist"
          });
        }
        return results;
      })
  );
};

const selectArticlesById = article_id => {
  return (
    connection
      .select("articles.*")
      .from("articles")
      .where("articles.article_id", "=", article_id)
      /**
       * with count, we are adding a new property
       * within the results. .count() will
       * automatically count the total for
       * comments.comment_id
       */
      .count({ comment_count: "comments.comment_id" })
      .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
      .groupBy("articles.article_id")
      .then(results => {
        if (results.length === 0) {
          return Promise.reject({
            status: 404,
            msg: "Article does not exist"
          });
        }
        return { results: results };
      })
  );
};

const changeVotes = (article_id, body = 0) => {
  return connection
    .select("*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .increment("votes", body)
    .returning("*")
    .then(results => {
      return results[0];
    });
};

module.exports = {
  selectArticles,
  selectArticlesById,
  changeVotes
};
