const router = require("koa-router")();

const routeList = require("./routes");
const paramValidator = require("../middlewares/paramValidator");
const verifyToken = require("../middlewares/auth");

routeList.forEach((item) => {
  const { method, path, controller, valid, auth = false } = item;

  router[method](path, paramValidator(valid), verifyToken(auth), controller);
});

module.exports = router;
