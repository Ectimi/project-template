const base = require("./base");
const dev = require("./dev");

const env = process.env.NODE_ENV || "dev";

const configMap = {
  dev,
};

module.exports = Object.assign(base, configMap[env]);
