const topicsRouter = require("express").Router();
const {
  sendTopics,
  patchTopics,
  catchAllController
} = require("../controllers/topicsController");

topicsRouter
  .route("/")
  .get(sendTopics)
  .patch(patchTopics) // 405
  .all(catchAllController); // 405

/**
 * .all() -> method which catches all other requests that will in this instance return a 405
 */

module.exports = topicsRouter;
