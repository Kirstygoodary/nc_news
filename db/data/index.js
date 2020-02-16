const ENV = process.env.NODE_ENV || "development";

const devData = require("../data/development-data/index");
const testData = require("../data/test-data/index");

const data = {
  test: testData,
  development: devData,
  production: devData
};

module.exports = data[ENV];
