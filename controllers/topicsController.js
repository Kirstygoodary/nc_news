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
  console.log("here");

  return res.send(); // Send the response.
};

const catchAllController = (req, res, next) => {
  console.log("catch all Controller");
  return res.sendStatus(405);
};

// for id ->
// deleteTreasures(req.params) <- invoking treasuresModel in controller
// .then(deleteCount => {
//  res.sendStatus(204)
//})
//
// in Model - deleteHouse({id}) => {
// sql commands
//  return db('houses')
// .where('house_id', id) <- condition. Here 'house_id' is the columns
// .del()
// .then(function(mystery) {

module.exports = { sendTopics, patchTopics, catchAllController };
