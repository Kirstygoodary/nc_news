const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesById,
  updateVotes,
  patchArticles,
  putArticles,
  putComments
} = require("../controllers/articlesController");

const {
  postComment,
  getComments
} = require("../controllers/commentsController");

articlesRouter
  .route("/")
  .get(sendArticles)
  .patch(patchArticles);

articlesRouter
  .route("/:article_id")
  .get(sendArticlesById)
  .patch(updateVotes)
  .put(putArticles);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getComments)
  .put(putComments);

module.exports = articlesRouter;
