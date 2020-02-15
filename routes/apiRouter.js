const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topicsRouter");
const usersRouter = require("../routes/usersRouter");
const articlesRouter = require("../routes/articlesRouter");
const commentsRouter = require("../routes/commentsRouter");

/**
 * DELETE - "/api" -> sends a 405 "Method not allowed"
 */

apiRouter.delete("/", (req, res, next) => {
  return res.sendStatus(405);
});

apiRouter.get("/", () => {
  res.send({
    "/api/articles": "returns all the articles"
  });
});

/**
 * Here, we have sub routers / nested routers which will organise our routes for each data table
 */

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.all("*", (req, res) => {
  return res.status(404).send({
    message: "Your custom 404 message"
  });
});

module.exports = apiRouter;
