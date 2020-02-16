const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topicsRouter");
const usersRouter = require("../routes/usersRouter");
const articlesRouter = require("../routes/articlesRouter");
const commentsRouter = require("../routes/commentsRouter");

apiRouter.delete("/", (req, res, next) => {
  return res.sendStatus(405);
});

apiRouter.get("/", () => {
  res.send({
    "/api/articles": "returns all the articles"
  });
});

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.all("*", (req, res) => {
  return res.status(404).send({
    message: "URL does not exist"
  });
});

module.exports = apiRouter;
