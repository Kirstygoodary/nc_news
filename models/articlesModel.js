const connection = require("../db/connection");

const selectArticles = (
  username,
  topic = "cooking",
  sort_by = "created_at",
  order = "desc"
) => {
  if (sort_by === "") {
    sort_by = "comment_count";
  }

  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")

    .modify(function(currentQuery) {
      if (username) {
        currentQuery.where("articles.author", username);
      } else {
        if (topic) {
          currentQuery.where("articles.topic", topic);
        }
      }
    })

    .orderBy(sort_by, order)
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Route not found"
        });
      }
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
