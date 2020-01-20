const selectTopics = require("../models/topicsModel");

const sendTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      return res.status(200).send({ topics });
    })
    .catch(function(err) {
      next(err);
    });
};

/**
 * @name patchTopics
 * @description This function executes patch
 * commands against the model.
 */
const patchTopics = (req, res, next) => {
  return res.send(405);
};

const catchAllController = (req, res, next) => {
  return res.sendStatus(405);
};

module.exports = { sendTopics, patchTopics, catchAllController };
