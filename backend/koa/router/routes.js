const { account } = require("../controllers");
const schema = require("../schema/index");

const routes = [
  {
    method: "get",
    path: "/testToken",
    auth: true,
    controller: account.test,
  },
  {
    method: "post",
    path: "/login",
    valid: schema.login,
    controller: account.login,
  },
  {
    method: "post",
    path: "/register",
    valid: schema.register,
    controller: account.register,
  },
  {
    method: "post",
    path: "/alterPassword",
    valid: schema.alterPassword,
    controller: account.alterPassword,
  },
  {
    method: "get",
    path: "/refreshToken",
    auth: true,
    controller: account.refreshToken,
  },
];

module.exports = routes;
