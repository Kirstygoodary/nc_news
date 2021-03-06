const express = require("express");
const app = express();
const apiRouter = require("./routes/apiRouter");
const cors = require("cors");

app.use(cors());

app.use(express.json());
app.use("/api", apiRouter);

app.all("/*", (req, res, next) => {
  return res.status(404).send({ msg: "Route not found" });
});

app.use(function(err, req, res, next) {
  if (err.status) {
    return res.status(err.status).send({ msg: err.msg });
  } else {
    if (err.code === "23503") {
      return res.status(404).send({ msg: "article ID does not exist" });
    }
  }
  {
    return res.status(400).send({
      message: "Bad request",
      error: err.message
    });
  }
});

module.exports = app;
