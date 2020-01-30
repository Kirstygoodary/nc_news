const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  return res.status(404).send({ msg: "Route not found" });
});

app.use(function(err, req, res, next) {
  if (err.status) {
    return res.sendStatus(err.status).send({ msg: err.msg });
  } else {
    if (err.code === "23503") {
      return res.sendStatus(404).send({ msg: "article ID does not exist" });
    }
  }
  {
    return res.status(400).send({ msg: "Bad request" });
  }
}); // generic error handler

//REMEMBER TO INCLUDE ANAT'S CODE FOR PSQL / CUSTOM ERRORS

module.exports = app;
