const connection = require("../db/connection");

const selectArticles = () => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .then(results => {
      return results;
    });
};

const selectArticlesById = article_id => {
  return connection
    .select("articles.*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
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
    });
};

module.exports = { selectArticles, selectArticlesById };
