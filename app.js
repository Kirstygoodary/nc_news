const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use("/api", apiRouter);

app.use(function(err, req, res, next) {
  console.log(err);
  res.status(400).send({ msg: "Bad request" });
}); // generic error handler

app.all("/*", (req, res, next) => res.status(404).send("Route not found"));
//REMEMBER TO INCLUDE ANAT'S CODE FOR PSQL / CUSTOM ERRORS

module.exports = app;
