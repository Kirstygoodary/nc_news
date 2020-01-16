const articlesRouter = require("express").Router();
const {
  sendArticles,
  sendArticlesById,
  updateVotes
} = require("../controllers/articlesController");

articlesRouter.route("/").get(sendArticles);

articlesRouter
  .route("/:article_id")
  .get(sendArticlesById)
  .patch(updateVotes);

module.exports = articlesRouter;
