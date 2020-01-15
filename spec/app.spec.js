process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");
const chai = require("chai");
const expect = chai.expect;

describe("/app", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe("/api", () => {
    describe("/topics", () => {
      it("GET: 200 response", () => {
        // mocha wont wait for the request to finish!
        //  if this anon function returns undefined - mocha doesn't know to wait
        // if i return a promise object mocha knows to wait -- so it wont pass things by default

        return request(app)
          .get("/api/topics")
          .expect(200) // asynchronous object -> promise
          .then(response => {});
        //   console.log(
        //     response.body.topics,
        //     "<<<<<this is what we are looking for"
        //     //expect
        //   );
        // });
      });
    });
    describe("/users", () => {
      it("GET 200 - response with a user object with properties 'username', 'avatar_url' and 'name'", () => {
        return request(app)
          .get("/api/users/:username")
          .expect(200)
          .then(response => {
            console.log(
              response.body.users,
              "<<<<results in app.spec for '/api/users/:username'"
              //expect
            );
          });
      });
    });
  });
});
