const usersRouter = require("express").Router();
const sendUsers = require("../controllers/usersController");

usersRouter.get("/:username", sendUsers);

module.exports = usersRouter;
