const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topicsRouter");
const usersRouter = require("../routes/usersRouter");
const articlesRouter = require("../routes/articlesRouter");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
