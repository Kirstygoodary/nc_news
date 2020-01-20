const connection = require("../db/connection");

const selectArticles = (
  username,
  topic,
  sort_by = "created_at",
  order = "desc"
) => {
  return connection
    .select("articles.*")
    .from("articles")
    .count({ comment_count: "comments.comment_id" })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .modify(function(currentQuery) {
      if (username) {
        console.log("Overriding username in the model with:", username);
        currentQuery.where("articles.author", username);
      } else {
        if (topic) {
          console.log("Overriding topics in the model with:", topic);
          currentQuery.where("articles.topic", topic);
        }
      }
    })
    .orderBy(sort_by, order)
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

const changeVotes = (article_id, body = 0) => {
  return connection
    .select("*")
    .from("articles")
    .where("articles.article_id", "=", article_id)
    .increment("votes", body)
    .returning("*")
    .then(results => {
      console.log(results, "<<<<results for updating votes");
      return results;
    });
};

module.exports = {
  selectArticles,
  selectArticlesById,
  changeVotes
};
