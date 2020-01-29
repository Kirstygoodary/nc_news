const usersRouter = require("express").Router();
const { sendUsers, putUsers } = require("../controllers/usersController");

usersRouter
  .route("/:username")
  .get(sendUsers)
  .put(putUsers); //405

module.exports = usersRouter;
