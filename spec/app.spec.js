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
    it("GET: 404 - sends the appropriate error message when given a bad request", () => {
      return request(app)
        .get("/api/topicsss")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Route not found");
        });
    });
  });

  describe("/users", () => {
    it("GET 200 - response with a user object with properties 'username', 'avatar_url' and 'name'", () => {
      return request(app)
        .get("/api/users/:username")
        .expect(200)
        .then(response => {
          expect(response.body).to.be.an("object");
        });
    });
    it("GET 404 - response with the appropriate error message when there is a bad request", () => {
      return request(app)
        .get("/api/userss/:username")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Route not found");
        });
    });
  });

  describe("articles", () => {
    it("responds with an article object, which has the properties 'author' (which is the username from the users table), 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', and 'comment count'", () => {
      return request(app)
        .get("/api/articles/")
        .expect(200)
        .then(response => {});
    });
    it("PATCH 200 - updates the votes and responds with the updated article", () => {
      return request(app)
        .patch("/api/articles/5")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(res => {
          expect(res.body).to.eql({ votes: 1 });
        });
    });
    it.only("POST 200 - posts a comment to the article and responds with the post comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "Kirsty", body: "Great article" })
        .expect(201)
        .then(res => {
          console.log(res.body);
          //expect(res.body).to.eql({})
        });
    });
    it("GET: 404 - sends the appropriate error message when given a valid but non-existent id", () => {
      return request(app)
        .get("/api/articles/797")
        .expect(404)
        .then(response => {
          expect(response.body.msg).to.equal("Article does not exist");
        });
    });
  });
});
