const {
  selectArticles,
  selectArticlesById,
  changeVotes
} = require("../models/articlesModel");

const selectTopics = require("../models/topicsModel");

const selectUsers = require("../models/usersModel");

const sendArticles = async (req, res, next) => {
  const { author } = req.query;
  const { topic } = req.query; // => ""
  const { sort_by } = req.query;
  const { order } = req.query;

  let selectTopicsErrored = false;
  let selectUsersErrored = false;

  /**
   * Before we continue, I am making sure
   * that the topic name even exists by querying
   * the Topics Model.
   *
   * If the query does not exist, it will be caught by the catch as an error
   */

  /**
   * Here, I am testing whether author or
   * topic is undefined.
   *
   * Before sending
   * the error message, I am telling
   * Javascript to wait for the results
   * from selectTopics and selectUsers,
   *
   * I am using a switch system. If the
   * results turn true, I am then
   * testing whether either are true,
   * before sending the error status
   */
  await selectTopics(topic).catch(err => {
    selectTopicsErrored = true;
  });

  /**
   * We now need to check whether the author (username)
   * exists, before we query the Articles Model.
   */

  await selectUsers(author).catch(err => {
    selectUsersErrored = true;
    /**
     * if there is an error, the catch will send a status of 404.
     * We need to return res.sendStatus so that the code stop
     * executing
     */
  });

  /**
   * Below, I am testing whether either results are
   * true.
   *
   * If either are true, then I am sending a 404 -> not found
   *
   * If they are false, then I am telling JS to execute
   * the selectArticles Controller
   */

  if (selectTopicsErrored === true || selectUsersErrored === true) {
    return res.sendStatus(404);
  }

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
       * for a single article, it needs to be returned in an object, and not an array
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

  /**
   * If the body is empty, it is an empty object.
   *
   * Therefore, we are checking to see if the object is
   * empty before sending the unchanged article back to
   * the client.
   */

  if (JSON.stringify(req.body) === "{}") {
    selectArticlesById(article_id)
      .then(fetchedArticle => {
        return res.status(200).send({
          article: fetchedArticle.results
        });
      })
      .catch(function(err) {
        console.error(err);
        next(err);
      });

    /**
     * Else if the body is not an empty object, execute changeVotes
     */
  } else {
    changeVotes(article_id, body)
      .then(article => {
        return res.status(200).send({ article });
      })
      .catch(next);
  }
};

/**
 * @name patchArticles
 * @description This function executes patch
 * commands against the model.
 */
const patchArticles = (req, res, next) => {
  return res.sendStatus(405); // Send the response.
};

/**
 * If a put request is made for articles or comments, we are sending a 405,
 * method not allowed.
 */

const putArticles = (req, res, next) => {
  return res.sendStatus(405);
};

const putComments = (req, res, next) => {
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
