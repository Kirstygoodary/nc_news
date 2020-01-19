const commentsRouter = require("express").Router();
const patchComment = require("../controllers/commentsController");

commentsRouter.route("/:comment_id").patch(patchComment);

module.exports = commentsRouter;
