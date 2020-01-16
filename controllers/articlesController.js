const {
  selectArticles,
  selectArticlesById
} = require("../models/articlesModel");

const sendArticles = (req, res, next) => {
  // const query = req.params;
  // console.log(query);

  selectArticles()
    .then(articles => {
      //console.log(articles, "<<<<<");
      res.status(200).send({ articles });
    })
    .catch(function(err) {
      console.log(err, "<<<<<error");
      next(err);
    });
};

const sendArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(article => {
      res.status(200).send({ article });
    })
    .catch(function(err) {
      //console.log(err, "<<<error in controller");
      next(err);
    });
};

module.exports = { sendArticles, sendArticlesById };
