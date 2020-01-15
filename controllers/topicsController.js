const selectTopics = require("../models/topicsModel");

const sendTopics = (req, res, next) => {
  //const query = req.query;
  //console.log("<<<<<<<<in the topics Controller");
  //console.log(query);

  selectTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(function(err) {
      console.log(err, "<<<<<error");
      next(err);
    });
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
//  console.log(mystery)
//  })

module.exports = sendTopics;
