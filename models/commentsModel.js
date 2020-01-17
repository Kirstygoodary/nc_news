const connection = require("../db/connection");

const addComment = (article_id, body) => {
  return connection
    .select("comments.*")
    .from("comments")
    .insert({ author: body.username, body: body.body, article_id: article_id })
    .returning("*")
    .then(results => {
      return results;
    });
  // .catch(err => console.log(err));
};

const sendComments = article_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .then(results => {
      console.log(results);
    });
};
module.exports = { addComment, sendComments };
