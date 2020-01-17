const { addComment, sendComments } = require("../models/commentsModel");

const postComment = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body;

  addComment(article_id, body)
    .then(comment => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

const getComments = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;
  const { order } = req.query;

  sendComments(article_id, sort_by, order)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = { postComment, getComments };
