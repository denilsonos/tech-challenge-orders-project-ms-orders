/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  coverageReporters: ["lcov"],
  coverageDirectory: './coverage',
  "reporters": [
    "default",
    ["./node_modules/jest-html-reporter", {
      "pageTitle": "MS Orders - Test Report",
    }]
  ]
};