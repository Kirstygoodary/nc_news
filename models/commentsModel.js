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

const sendComments = (article_id, sort_by = "created_at", order = "desc") => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by, order)
    .then(results => {
      return results;
    });
};

changeComment = (comment_id, inc_votes) => {
  // return
};

module.exports = { addComment, sendComments, changeComment };

//sort_by, which sorts the comments by any valid column (defaults to created_at)
// order, which can be set to asc or desc for ascending or descending (defaults to descending)
//module.exports = { addComment, sendComments };
