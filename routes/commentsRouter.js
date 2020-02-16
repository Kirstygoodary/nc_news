const commentsRouter = require("express").Router();
const {
  amendComment,
  putComment,
  deleteCommentController,
  postComment
} = require("../controllers/commentsController");

commentsRouter
  .route("/:comment_id")
  .patch(amendComment)
  .put(putComment)
  .delete(deleteCommentController)
  .post(postComment);

module.exports = commentsRouter;
