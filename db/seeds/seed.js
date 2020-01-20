const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js");

const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

/**
 * We are populating the tables with the data provided.
 *
 * Each time we migrate the file, the data is rolled
 * back and re-populated to the table with the
 * latest data.
 *
 * We are re-inserting the data for each table.
 *
 * The order has been considered here. Topics and Users
 * are not dependant on data from other tables.
 * Therefore the data is inserted first and return
 * Promise.all for these insertions.
 *
 * Once this has been successful, we insert the data
 * from the function for formatDates, taking
 * articleData as its argument.
 *
 * Return each time we populate the tables so that
 * JS knows to finish executing the block.
 */

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const topicsInsertions = knex("topics")
        .insert(topicData)
        .returning("*");

      const usersInsertions = knex("users").insert(userData);

      return Promise.all([topicsInsertions, usersInsertions]);
    })
    .then(insertedData => {
      const formattedArticleDates = formatDates(articleData);

      return knex("articles")
        .insert(formattedArticleDates)
        .returning("*");
      // reformat article data
      //   1. change timestamp num to new Date
    })
    .then(articleRows => {
      const articleRef = makeRefObj(articleRows);

      const formattedComments = formatComments(commentData, articleRef);

      return knex("comments")
        .insert(formattedComments)
        .returning("*");
    })
    .catch(err => {});
};
