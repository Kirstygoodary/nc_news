process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");
const chai = require("chai");
const expect = chai.expect;
chai.use(require("chai-sorted"));

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
    it("PATCH 405 - sends the appropriate error message when given a patch request", () => {
      return request(app)
        .patch("/api/topics")
        .expect(405);
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
        .get("/api/users/butter_bridge")
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
        .then(response => {
          expect(response.body.articles[0].article_id).to.equal(1);
        });
    });
    it("responds with the first article which should have a comment_count of 13", () => {
      return request(app)
        .get("/api/articles/")
        .expect(200)
        .then(response => {
          expect(response.body.articles[0].comment_count).to.equal("13");
        });
    });
    it("responds with the articles for butter_bridge", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(response => {
          expect(response.body.articles[0].author).to.equal("butter_bridge");
          expect(response.body.articles[1].author).to.equal("butter_bridge");
          expect(response.body.articles[2].author).to.equal("butter_bridge");
        });
    });
    it("PATCH 200 - updates the votes and responds with the updated article", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(res => {
          expect(res.body.article[0].votes).to.eql(101);
          expect(res.body).to.contain.keys("article");
        });
    });
    it("PATCH 400 - sends a 400 when there is an invalid votes value", () => {
      return request(app)
        .patch("/api/articles/1")
        .send({ inc_votes: "a" })
        .expect(400);
    });
    it("PATCH 200 - ignores a patch request when there is no information in the body, and sends the unchanged article to the client", () => {
      return request(app)
        .patch("/api/articles/1")
        .send()
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.eql(100);
        });
    });
    it("GET 200 - a request for article id 1 returns an object", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(res => {
          expect(res.body.article).to.contain.keys(
            "article_id",
            "body",
            "title",
            "topic",
            "author",
            "created_at",
            "votes"
          );
        });
    });
    it("POST 201 - posts a comment to the article and responds with the post comment", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "rogersop", body: "Great article" })
        .expect(201)
        .then(res => {
          expect(res.body).to.contain.keys("comment");
          expect(res.body.comment[0]).to.contain.keys(
            "comment_id",
            "author",
            "body",
            "votes",
            "created_at"
          );
          expect(res.body.comment[0].body).to.eql("Great article");
          expect(res.body.comment[0].author).to.eql("rogersop");
          expect(res.body.comment[0].votes).to.eql(0);
          expect(res.body.comment[0].created_at).to.eql(
            "2020-01-20T00:00:00.000Z"
          );
          /**
           * This test needs to be amended so that it provides the updated date every time the data is migrated.
           */
        });
    });
    it("GET 200 - responds with an array of comments for the given article_id ", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=created_at&&order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.comments).to.be.sortedBy("created_at", {
            ascending: true
          });
        });
    });
    it("GET 200 - responds with an array of comments, with a key of comments", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=created_at&&order=asc")
        .expect(200)
        .then(res => {
          expect(res.body).to.contain.keys("comments");
          expect(res.body.comments).to.be.an("Array");
        });
    });
    it("GET 200 - responds with an array of comments for the given article_id ", () => {
      return request(app)
        .get("/api/articles?sort_by=author")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].author).to.eql("rogersop");
        });
    });
    it("GET 200 - responds with a sorted order of articles, in ascending order", () => {
      return request(app)
        .get("/api/articles?order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].title).to.eql("Moustache");
        });
    });

    it("GET 200 - responds with an of articles for author butter_bridge", () => {
      return request(app)
        .get("/api/articles?author=butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body.articles[0].author).to.eql("butter_bridge");
          expect(res.body.articles[1].author).to.eql("butter_bridge");
          expect(res.body.articles[2].author).to.eql("butter_bridge");
        });
    });
    it("GET 200 - responds with an array of articles for topic mitch", () => {
      return request(app)
        .get("/api/articles?topic=mitch")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.eql(11);
          expect(res.body.articles[0].topic).to.eql("mitch");
        });
    });
    it("GET 200 - responds with an empty array for author Lurker", () => {
      return request(app)
        .get("/api/articles?author=lurker")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.eql(0);
          expect(res.body.articles).to.eql([]);
        });
    });
    it("GET 200 - responds with an empty array for topic 'paper'", () => {
      return request(app)
        .get("/api/articles?topic=paper")
        .expect(200)
        .then(res => {
          expect(res.body.articles.length).to.eql(0);
          expect(res.body.articles).to.eql([]);
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
    it("GET: 404 - sends the appropriate error message when given a non-existent topic", () => {
      return request(app)
        .get("/api/articles/?topic=not-a-topic")
        .expect(404);
    });
    it("GET: 404 - sends the appropriate error message when given a non-existent author", () => {
      return request(app)
        .get("/api/articles/?author=not-an-author")
        .expect(404);
    });
    it("PATCH 405 - sends the appropriate error message when given a patch request", () => {
      return request(app)
        .patch("/api/articles")
        .expect(405);
    });
    it("GET 200 - returns the article with id 2", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(res => {
          expect(res.body.article.votes).to.eql(0);
          expect(res.body.article.comment_count).to.eql("0");
        });
    });
    it("returns article id 1", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(res => {
          expect(res.body.article.comment_count).to.eql("13");
        });
    });
    it("PUT 405 - sends the appropriate error message when given a patch request", () => {
      return request(app)
        .put("/api/articles/1")
        .expect(405);
    });
    it("sorts the articles by votes in descending order", () => {
      return request(app)
        .get("/api/articles/1/comments?sort_by=votes")
        .expect(200)
        .then(res => {
          expect(res.body.comments[0].votes).to.eql(100);
        });
    });
    it("sorts the articles by votes in ascending order", () => {
      return request(app)
        .get("/api/articles/1/comments?order=asc")
        .expect(200)
        .then(res => {
          expect(res.body.comments[0].created_at).to.eql(
            "2000-11-26T00:00:00.000Z"
          );
        });
    });
    it("returns a 200 with an empty array when the article exists but has no comments", () => {
      return request(app)
        .get("/api/articles/2/comments")
        .expect(200)
        .then(res => {
          expect(res.body.comments.length).to.eql(0);
        });
    });
    it("returns a 404 when articles does not exist in comments endpoint", () => {
      return request(app)
        .get("/api/articles/2000/comments")
        .expect(404);
    });
    it("returns a 404 when articles does not exist in comments endpoint, for 1000 article id", () => {
      return request(app)
        .get("/api/articles/10000/comments")
        .expect(404);
    });
    it("returns a 400 when given a non-existent id", () => {
      return request(app)
        .get("/api/articles/not-a-valid-id/comments")
        .expect(400);
    });
    // it("returns a 400 when supplied an invalid order for comments", () => {
    //   return request(app)
    //     .get("/api/articles/1/comments?order=not-a-valid-order")
    //     .expect(400);
    // });
    it("PUT 405 - sends the appropriate error message when given a patch request for comments", () => {
      return request(app)
        .put("/api/articles/1/comments")
        .expect(405);
    });
    it("POST 201 - sends the appropriate response when given a post request for comments on article_id", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({
          username: "rogersop",
          body: "hello"
        })
        .expect(201)
        .then(res => {
          expect(res.body).to.contain.keys("comment");
        });
    });
    it("PATCH 400 - sends a 400 when there is an invalid increased votes value", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: "a" })
        .expect(400);
    });
    it("PATCH 200 - sends a 200 when there's an updated vote for comments", () => {
      return request(app)
        .patch("/api/comments/1")
        .send({ inc_votes: 1 })
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.eql(17);
          expect(res.body.comment).to.contain.keys("votes");
          expect(res.body).to.contain.keys("comment");
        });
    });
    it("PUT 405 - sends a 405 when a put request is made for comments", () => {
      return request(app)
        .put("/api/comments/1")
        .expect(405);
    });
    it("DEL 204 when a succesful delete request for comments", () => {
      return request(app)
        .del("/api/comments/1")
        .expect(204);
    });
    it("DEL 400 received when a comment id is not a number", () => {
      return request(app)
        .del("/api/comments/not-a-number")
        .expect(400);
    });
    it("POST 400, sends a 400 when the post request does not include all the keys", () => {
      return request(app)
        .post("/api/articles/1/comments")
        .send({ username: "rogersop" })
        .expect(400);
    });
    it("POST 400, sends a 400 when the article id is not a valid id", () => {
      return request(app)
        .post("/api/articles/not-a-valid-id/comments")
        .expect(400);
    });
    it("PATCH 200 - sends a 200 when sent a body with no inc_votes property", () => {
      return request(app)
        .patch("/api/comments/1")
        .send()
        .expect(200)
        .then(res => {
          expect(res.body.comment.votes).to.eql(16);
        });
    });
    it("GET 200 - sends a user object when there's a get request for the user", () => {
      return request(app)
        .get("/api/users/butter_bridge")
        .expect(200)
        .then(res => {
          expect(res.body).to.contain.keys("user");
          expect(res.body).to.be.an("object");
          expect(res.body.user).to.contain.keys(
            "username",
            "avatar_url",
            "name"
          );
        });
    });
    it("GET: 404 - sends the appropriate error message when given a non-existent username", () => {
      return request(app)
        .get("/api/users/not-a-username")
        .expect(404);
    });
    it("PUT 405 - sends the appropriate error message when given a put request for username", () => {
      return request(app)
        .put("/api/users/butter_bridge")
        .expect(405);
    });
    it("DELETE 405 - sends the appropriate error message when a delete request is made for the api", () => {
      return request(app)
        .del("/api")
        .expect(405);
    });
  });
});
