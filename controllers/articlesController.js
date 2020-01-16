const {
  selectArticles,
  selectArticlesById
} = require("../models/articlesModel");

const sendArticles = (req, res, next) => {
  selectArticles()
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(function(err) {
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
      next(err);
    });
};

module.exports = { sendArticles, sendArticlesById };
