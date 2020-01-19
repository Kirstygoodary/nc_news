const {
  selectArticles,
  selectArticlesById,
  changeVotes
} = require("../models/articlesModel");

const selectTopics = require("../models/topicsModel");

const selectUsers = require("../models/usersModel");

const sendArticles = (req, res, next) => {
  const { author } = req.query;
  const { topic } = req.query;
  const { sort_by } = req.query;
  const { order } = req.query;

  /**
   * Before we continue, let's just make sure
   * that the topic name even exists by querying
   * the Topics Model.
   *
   * If the query does not exist, it will be caught by the catch as an error
   */

  selectTopics(topic).catch(err => {
    /**
     * if there is an error, the catch will send a status of 404.
     * We need to return res.sendStatus so that the code stop
     * executing
     */
    return res.sendStatus(404);
  });

  /**
   * We now need to check whether the author (username)
   * exists, before we query the Articles Model.
   */

  selectUsers(author).catch(err => {
    /**
     * if there is an error, the catch will send a status of 404.
     * We need to return res.sendStatus so that the code stop
     * executing
     */
    console.log("no user found");
    return res.sendStatus(404);
  });

  selectArticles(author, topic, sort_by, order)
    .then(fetchedArticles => {
      return res.status(200).send({ articles: fetchedArticles });
    })
    .catch(function(err) {
      console.error(err);
      next(err);
    });
};

const sendArticlesById = (req, res, next) => {
  const { article_id } = req.params;
  selectArticlesById(article_id)
    .then(fetchedArticle => {
      /**
       * for a single article, it need to be returned in an object, and not an array
       *
       * To do this, articles response is set as a
       * default to fetchedArticles.
       *
       * If the length of
       * fetchedArticles is 1, articlesResponse is now
       * fetchedArticles[0]. This changes the array
       * in to an object
       */

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

  console.log(req.body, "this is the body in update votes Controller");

  /**
   * If the body is empty it is an empty object,
   * therefore we are checking to see if the object is
   * empty before sending the unchanged article back to
   * the client.
   */
  if (JSON.stringify(req.body) === "{}") {
    selectArticlesById(article_id)
      .then(fetchedArticle => {
        return res.status(200).send({
          article: fetchedArticle.results[0]
        });
      })
      .catch(function(err) {
        console.error(err);
        next(err);
      });
  }

  changeVotes(article_id, body)
    .then(votes => {
      return res.status(200).send({ votes });
    })
    .catch(next);
};

/**
 * @name patchArticles
 * @description This function executes patch
 * commands against the model.
 */
const patchArticles = (req, res, next) => {
  console.log("here");

  return res.sendStatus(405); // Send the response.
};

const putArticles = (req, res, next) => {
  console.log("here");

  return res.sendStatus(405); // Send the response.
};

const putComments = (req, res, next) => {
  console.log("here");

  return res.sendStatus(405); // Send the response.
};

module.exports = {
  sendArticles,
  sendArticlesById,
  updateVotes,
  patchArticles,
  putArticles,
  putComments
};
