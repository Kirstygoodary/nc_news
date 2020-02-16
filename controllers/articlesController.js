const {
  selectArticles,
  selectArticlesById,
  changeVotes
} = require("../models/articlesModel");

const selectTopics = require("../models/topicsModel");

const selectUsers = require("../models/usersModel");

const sendArticles = async (req, res, next) => {
  const { author } = req.query;
  const { topic } = req.query;
  const { sort_by } = req.query;
  const { order } = req.query;

  let selectTopicsErrored = false;
  let selectUsersErrored = false;

  await selectTopics(topic).catch(err => {
    selectTopicsErrored = true;
  });

  await selectUsers(author).catch(err => {
    selectUsersErrored = true;
  });

  if (selectTopicsErrored === true || selectUsersErrored === true) {
    return res.sendStatus(404);
  }

  selectArticles(author, topic, sort_by, order)
    .then(fetchedArticles => {
      return res.status(200).send({ articles: fetchedArticles });
    })
    .catch(function(err) {
      next(err);
    });
};

const sendArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(fetchedArticle => {
      return res.status(200).send({
        article: fetchedArticle.results[0]
      });
    })
    .catch(function(err) {
      next(err);
    });
};

const updateVotes = (req, res, next) => {
  const { article_id } = req.params;
  const body = req.body.inc_votes;

  if (JSON.stringify(req.body) === "{}") {
    selectArticlesById(article_id)
      .then(fetchedArticle => {
        return res.status(200).send({
          article: fetchedArticle.results
        });
      })
      .catch(function(err) {
        next(err);
      });
  } else {
    changeVotes(article_id, body)
      .then(article => {
        return res.status(200).send({ article });
      })
      .catch(next);
  }
};

const patchArticles = (req, res, next) => {
  return res.sendStatus(405);
};

const putArticles = (req, res, next) => {
  return res.sendStatus(405);
};

const putComments = (req, res, next) => {
  return res.sendStatus(405);
};

module.exports = {
  sendArticles,
  sendArticlesById,
  updateVotes,
  patchArticles,
  putArticles,
  putComments
};
