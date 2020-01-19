const {
  addComment,
  sendComments,
  changeComment,
  deleteCommentModel
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
   * If the order is neither ascending or descending, send a 400
   */
  // if (order !== "asc" || order !== "desc") {
  //   return res.sendStatus(400);
  // }

  /**
   * If no article exists here, we need to return a 404.
   * This can be checked with selectArticles Model
   */

  /**
   * Here, we are checking that article_id exists first before executing the model function.
   * If it doesn't exist, the error will go in to the independent catch block to run the error
   */

  selectArticlesById(article_id)
    .then(results => {
      console.log("Article exists!");
      console.log(results, "<<<results");

      sendComments(article_id, sort_by, order)
        .then(comments => {
          console.log("sending 200");
          return res.status(200).send({ comments });
        })
        .catch(next);
    })
    .catch(err => {
      console.log(err, "error in the comments controller");
      /**
       * if there is an error, the catch will send a status of 404.
       * We need to return res.sendStatus so that the code stop
       * executing
       * If the error is an invalid id, send 400.
       * Else if non-existent, send 404
       */
      if (err.status === 404) {
        return res.sendStatus(err.status);
      }
      return res.sendStatus(400);
    });
};

const amendComment = (req, res, next) => {
  const { comment_id } = req.params;
  const { inc_votes } = req.body;

  changeComment(comment_id, inc_votes)
    .then(comment => {
      return res.status(200).send({ comment });
    })
    .catch(next);
};

const putComment = (req, res, next) => {
  return res.sendStatus(405); // Send the response.
};

const deleteCommentController = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentModel(comment_id)
    .then(comments => {
      return res.sendStatus(204);
    })
    .catch(next);
};

module.exports = {
  postComment,
  getComments,
  amendComment,
  putComment,
  deleteCommentController
};
