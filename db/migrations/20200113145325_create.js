exports.up = function(knex) {
  // console.log("the up function has been called..creating topics table");
  return knex.schema.createTable("topics", topicsTable => {
    topicsTable
      .text("slug")
      .primary()
      .notNullable();
    topicsTable.text("description").notNullable();
  });
};

exports.down = function(knex) {
  // console.log("the down function has been called for topics table");
  return knex.schema.dropTable("topics");
};
