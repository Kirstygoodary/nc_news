const selectArticles = require("../models/articlesModel");

const sendArticles = (req, res, next) => {
  selectArticles()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(function(err) {
      console.log(err, "<<<<<error");
      next(err);
    });
};

module.exports = sendArticles;
