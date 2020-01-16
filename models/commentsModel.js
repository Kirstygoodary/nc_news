const connection = require("../db/connection");

const addComment = (id, body) => {
  return connection
    .select("comments.*")
    .from("comments")
    .where("comments.comment_id", "=", "")
    .insert({ author: body.username, body: body.body, article_id: id })
    .then(results => {
      console.log(results);
      return results;
    });
};

module.exports = addComment;
