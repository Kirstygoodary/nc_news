const topicsRouter = require("express").Router();
const {
  sendTopics,
  patchTopics,
  catchAllController
} = require("../controllers/topicsController");

topicsRouter
  .route("/")
  .get(sendTopics)
  .all(catchAllController);

/**
 * .all() -> method which catches all other requests that will in this instance return a 405
 */

module.exports = topicsRouter;
