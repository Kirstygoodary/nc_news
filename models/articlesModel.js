const connection = require("../db/connection");

const selectArticles = () => {
  console.log("<<<< in the users Model");
  return connection
    .select("articles.*")
    .from("articles")
    .leftJoin("articles.article_id", "=", "comments.comment_id")
    .groupBy("articles.article_id")
    .count({ comment_count: "comments.comment_id" })
    .then(results => {
      console.log(results, "results in the users model");
      return results;
    });
};

module.exports = selectArticles;
