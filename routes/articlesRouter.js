const articlesRouter = require("express").Router();
const sendArticles = require("../controllers/articlesController");

articlesRouter.get("/:article_id", sendArticles);

module.exports = articlesRouter;
