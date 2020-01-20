const ENV = process.env.NODE_ENV || "development";

/**
 * Here, we are checking the node environment - we need to point it to "test" so that we are running the test environment
 */

const devData = require("../data/development-data/index");
const testData = require("../data/test-data/index");

const data = {
  test: testData,
  development: devData,
  production: devData
};

module.exports = data[ENV];
