exports.up = function(knex) {
  console.log("creating articles table");
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable
      .increments("article_id")
      .primary()
      .notNullable();
    articlesTable.string("title").notNullable();
    articlesTable.string("body").notNullable();
    articlesTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    articlesTable
      .string("topic")
      .references("topics.slug")
      .notNullable();
    articlesTable
      .string("author")
      .references("users.username")
      .notNullable();
    articlesTable.timestamp("created_at");
  });
};

exports.down = function(knex) {
  console.log("the down function has been called for articles table");
  return knex.schema.dropTable("articles");
};
