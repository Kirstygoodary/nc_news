const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use("/api", apiRouter);

app.all("/*", (req, res, next) =>
  res.status(404).send({ msg: "Route not found" })
);

app.use(function(err, req, res, next) {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else res.status(400).send({ msg: "Bad request" });
}); // generic error handler

//REMEMBER TO INCLUDE ANAT'S CODE FOR PSQL / CUSTOM ERRORS

module.exports = app;
