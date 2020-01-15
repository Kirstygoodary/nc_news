exports.up = function(knex) {
  //console.log("creating articles table");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable.increments("article_id").primary();
    articlesTable.text("title");
    articlesTable.text("body").notNullable();
    articlesTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    articlesTable
      .text("topic")
      .references("topics.slug")
      .notNullable();
    articlesTable.text("author").references("users.username");
    articlesTable.timestamp("created_at");
  });
};

exports.down = function(knex) {
  // console.log("the down function has been called for articles table");
  return knex.schema.dropTable("articles");
};
