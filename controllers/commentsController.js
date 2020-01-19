const {
  addComment,
  sendComments,
  changeComment
} = require("../models/commentsModel");
const { selectArticlesById } = require("../models/articlesModel");

const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;

  addComment(article_id, body)
    .then(comment => {
      return res.status(201).send({ comment });
    })
    .catch(next);
};

const getComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;
  const { order } = req.query;

  console.log(order, "< incoming comments order");

  /**
   * If the order is neither ascending or descening, send a 400
   */
  // if (order !== "asc" || order !== "desc") {
  //   return res.sendStatus(400);
  // }

  /**
   * If no article exists here, we need to return a 404.
   * This can be checked with selectArticles Model
   */

  selectArticlesById(article_id).catch(err => {
    console.log(err, "error in the comments controller");
    console.log(err.code, "error code");
    /**
     * if there is an error, the catch will send a status of 404.
     * We need to return res.sendStatus so that the code stop
     * executing
     * If the error is an invalid id, send 400.
     * Else if non-existent, send 404
     */
    if (err.code === "22P02") {
      console.log("sending 400");
      return res.sendStatus(400);
    }
    return res.sendStatus(404);
  });

  console.log("moved passed article check");

  sendComments(article_id, sort_by, order)
    .then(comments => {
      return res.status(200).send({ comments });
    })
    .catch(next);
};

const amendComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  changeComment(comment_id, inc_votes);
};

module.exports = { postComment, getComments, amendComment };
