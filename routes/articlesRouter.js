const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesById,
  updateVotes
} = require("../controllers/articlesController");

const {
  postComment,
  getComments
} = require("../controllers/commentsController");

articlesRouter.route("/").get(sendArticles);

articlesRouter
  .route("/:article_id")
  .get(sendArticlesById)
  .patch(updateVotes);

articlesRouter
  .route("/:article_id/comments")
  .post(postComment)
  .get(getComments);

module.exports = articlesRouter;
