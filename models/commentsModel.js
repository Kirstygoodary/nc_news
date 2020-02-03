const connection = require("../db/connection");

const addComment = (username, body, article_id) => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .insert({ author: username, body: body, article_id: article_id })
    .returning("*")
    .then(results => {
      return results[0];
    });
};

const sendComments = (article_id, sort_by = "created_at", order = "desc") => {
  return connection
    .select("comment_id", "votes", "created_at", "author", "body")
    .from("comments")
    .where("comments.article_id", "=", article_id)
    .orderBy(sort_by, order);
  // .then(results => {
  //   if (results.length === 0) {
  //     return Promise.reject({
  //       status: 404,
  //       msg: "Comment does not exist"
  //     });
  //   }
  //   return results;
  // });
};

changeComment = (comment_id, inc_votes) => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .increment("votes", inc_votes)
    .returning("*")
    .then(results => {
      if (results.length === 0) {
        return Promise.reject({
          status: 404,
          msg: "Comment does not exist"
        });
      }
      return results;
    });
};

deleteCommentModel = comment_id => {
  return connection
    .select("*")
    .from("comments")
    .where("comments.comment_id", "=", comment_id)
    .del()
    .then(function(deleteCount) {
      if (!deleteCount) {
        return Promise.reject({
          status: 404,
          msg: "Not found"
        });
      }
      return deleteCount;
    });
};

module.exports = {
  addComment,
  sendComments,
  changeComment,
  deleteCommentModel
};

//sort_by, which sorts the comments by any valid column (defaults to created_at)
// order, which can be set to asc or desc for ascending or descending (defaults to descending)
//module.exports = { addComment, sendComments };
