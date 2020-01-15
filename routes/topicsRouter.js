const topicsRouter = require("express").Router();
const sendTopics = require("../controllers/topicsController");

topicsRouter.route("/").get(sendTopics);

//topicsRouter.route(":id")
//.delete()
//.get()
// DRY principle

module.exports = topicsRouter;
