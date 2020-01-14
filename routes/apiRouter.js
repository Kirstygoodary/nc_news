const apiRouter = require("express").Router();
const topicsRouter = require("../routes/topicsRouter");

apiRouter.use("/topics", topicsRouter);

module.exports = apiRouter;
