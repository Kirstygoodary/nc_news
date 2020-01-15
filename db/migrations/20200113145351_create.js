exports.up = function(knex) {
  //console.log("creating users table");
  return knex.schema.createTable("users", usersTable => {
    usersTable
      .text("username")
      .primary()
      .unique();
    usersTable.text("avatar_url").notNullable();
    usersTable.text("name").notNullable();
  });
};

exports.down = function(knex) {
  // console.log("the down function has been called for users table");
  return knex.schema.dropTable("users");
};
