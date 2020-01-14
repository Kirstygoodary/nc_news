process.env.NODE_ENV = "test";
const app = require("../app");
const request = require("supertest");
const connection = require("../db/connection");
const chai = require("chai");
const expect = chai.expect;

describe("/app", () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
});
describe("/api", () => {
  it("GET: 200 response", () => {
    request(app)
      .get("/api/topics")
      .expect(200)
      .then(response => {
        console.log(
          response.body.topics,
          "<<<<<this is what we are looking for"
        );
      });
  });
});
