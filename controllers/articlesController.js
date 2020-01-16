const {
  selectArticles,
  selectArticlesById,
  changeVotes
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

const updateVotes = (req, res, next) => {
  const id = req.params.article_id;
  const body = req.body;

  changeVotes(id, body)
    .then(votes => {
      res.status(200).send({ votes });
    })
    .catch(next);
};

module.exports = { sendArticles, sendArticlesById, updateVotes };
