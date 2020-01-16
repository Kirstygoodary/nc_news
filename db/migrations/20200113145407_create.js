exports.up = function(knex) {
  return knex.schema.createTable("articles", articlesTable => {
    articlesTable
      .increments("article_id")
      .primary()
      .notNullable();
    articlesTable.text("title").notNullable();
    articlesTable.text("body").notNullable();
    articlesTable
      .integer("votes")
      .defaultTo(0)
      .notNullable();
    articlesTable
      .text("topic")
      .references("topics.slug")
      .notNullable();
    articlesTable
      .text("author")
      .references("users.username")
      .notNullable();
    articlesTable.timestamp("created_at").notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
