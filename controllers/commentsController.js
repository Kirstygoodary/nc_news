const addComment = require("../models/commentsModel");

const postComment = (req, res, next) => {
  const id = req.params;
  const body = req.body;

  console.log(id);

  addComment(id, body)
    .then(comment => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

module.exports = postComment;
