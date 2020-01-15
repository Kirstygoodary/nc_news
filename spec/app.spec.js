process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");
const chai = require("chai");
const expect = chai.expect;

describe("/app", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());

  describe("/topics", () => {
    it("GET: 200 response", () => {
      // mocha wont wait for the request to finish!
      //  if this anon function returns undefined - mocha doesn't know to wait
      // if i return a promise object mocha knows to wait -- so it wont pass things by default

      return request(app)
        .get("/api/topics")
        .expect(200) // asynchronous object -> promise
        .then(response => {
          expect(response.body).to.be.an("object");
          expect(response.body.topics[0]).to.have.keys("slug", "description");
        });
    });
    it.only("GET: 404 - sends the appropriate error message when given a bad request", () => {
      return request(app)
        .get("/api/topicsss")
        .expect(404);
      // //.then(response => {
      // console.log(typeof response.body);
      //   //NOTE - RESPONSE.BODY = {}
      expect(response.body.msg).to.equal("Not found");
      //});
    });
  });

  describe("/users", () => {
    it("GET 200 - response with a user object with properties 'username', 'avatar_url' and 'name'", () => {
      return request(app)
        .get("/api/users/:username")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
          console.log(
            response.body,
            "<<<<results in app.spec for '/api/users/:username'"
          );
          //expect
          // need to add 'topics' in to object
        });
    });
    it.only("GET 404 - response with the appropriate error message when there is a bad request", () => {
      return request(app)
        .get("/api/users/:uzernamee")
        .expect(404);
      // .then(response => {
      //   console.log(response.body);
      //   expect(response.body.msg).to.equal("Bad request");
      // });
    });
  });

  describe("users", () => {
    it("responds with an article object, which has the properties 'author' (which is the username from the users table), 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', and 'comment count'", () => {
      return request(app)
        .get("/api/articles/:article_id")
        .expect(200)
        .then(response => {
          console.log(response.body, "<<<response.body");
        });
    });
  });
});
