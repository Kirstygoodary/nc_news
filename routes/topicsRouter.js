const topicsRouter = require("express").Router();
const {
  sendTopics,
  patchTopics,
  catchAllController
} = require("../controllers/topicsController");

topicsRouter
  .route("/")
  .get(sendTopics)
  .patch(patchTopics)
  .all(catchAllController);

module.exports = topicsRouter;
