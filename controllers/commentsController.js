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

  const getCommentsPromise = sendComments(article_id, sort_by, order);
  const getArticlePromise = selectArticlesById(article_id);

  Promise.all([getCommentsPromise, getArticlePromise])
    .then(([comments]) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

const amendComment = (req, res, next) => {
  const { comment_id } = req.params;
  const inc_votes = req.body.inc_votes || 0;

  changeComment(comment_id, inc_votes)
    .then(comment => {
      return res.status(200).send({ comment: comment[0] });
    })
    .catch(next)
    .catch(err => {
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
