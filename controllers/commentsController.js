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

  sendComments(article_id)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

module.exports = { postComment, getComments };
