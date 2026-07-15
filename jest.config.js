const nextJest = require("next/jest");
const dotenv = require("dotenv");

dotenv.config({
  path: ".env.development",
});
const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  testTimout: 60000,
});

module.exports = jestConfig;
