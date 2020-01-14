exports.up = function(knex) {
  console.log("creating comments table");

  return knex.schema.createTable("comments", commentsTable => {
    commentsTable.increments("comment_id").primary();
    commentsTable
      .string("author")
      .references("users.username")
      .notNullable();
    commentsTable
      .integer("article_id")
      .references("articles.article_id")
      .notNullable();
    commentsTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    commentsTable.date("created_at").defaultTo(knex.fn.now());
    commentsTable.string("body").notNullable();
  });
};

exports.down = function(knex) {
  console.log("the down function has been called for comments table");
  return knex.schema.dropTable("comments");
};