const {
  addComment,
  sendComments,
  changeComment,
  deleteCommentModel
} = require("../models/commentsModel");
const { selectArticlesById } = require("../models/articlesModel");

const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const { body } = req.body;
  const { username } = req.body;

  addComment(username, body, article_id)
    .then(comments => {
      return res.status(201).send({ comment: comments });
    })
    .catch(next)
    .catch(err => {
      console.log(err);
      /**
       * if there is an error, the catch will send a status of 404 -> not found
       * We need to return res.sendStatus so that the code stop
       * executing
       * If the error is an invalid id, send 400, bad request.
       * Else if non-existent, send 404
       */
      if (err.status === 404) {
        return res.sendStatus(err.status);
      }
      return res.sendStatus(400);
    });
};

const getComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;
  const { order } = req.query;

  /**
   * If the order is neither ascending or descending, send a 400
   */
  // if (order !== "asc" || order !== "desc") {
  //   return res.sendStatus(400);
  // }

  /**
   * If no article exists here, we are returning a 404.
   * This can be checked with selectArticles Model
   */

  /**
   * Here, we are checking that article_id exists first before executing the model function.
   * If it doesn't exist, the error will go in to the independent catch block to run the error
   */

  selectArticlesById(article_id).then(results => {
    sendComments(article_id, sort_by, order)
      .then(comments => {
        return res.status(200).send({ comments });
      })
      .catch(next);
  });
  // .catch(err => {
  //   console.log(err);
  //   /**
  //    * if there is an error, the catch will send a status of 404 -> not found
  //    * We need to return res.sendStatus so that the code stop
  //    * executing
  //    * If the error is an invalid id, send 400, bad request.
  //    * Else if non-existent, send 404
  //    */
  //   if (err.status === 404) {
  //     return res.sendStatus(err.status);
  //   }
  //   return res.sendStatus(400);
  // });
};

const amendComment = (req, res, next) => {
  const { comment_id } = req.params;
  const inc_votes = req.body.inc_votes || 0;

  /**
   * For inc_votes, if req.body.inc_votes does not
   * exist, for example when there is no body
   * in the request, inc_votes will default to 0
   */

  changeComment(comment_id, inc_votes)
    .then(comment => {
      return res.status(200).send({ comment: comment[0] });
    })
    .catch(next)
    .catch(err => {
      console.log(err);
      /**
       * if there is an error, the catch will send a status of 404 -> not found
       * We need to return res.sendStatus so that the code stop
       * executing
       * If the error is an invalid id, send 400, bad request.
       * Else if non-existent, send 404
       */
      if (err.status === 404) {
        return res.sendStatus(err.status);
      }
      return res.sendStatus(400);
    });
};

const putComment = (req, res, next) => {
  return res.sendStatus(405);
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
