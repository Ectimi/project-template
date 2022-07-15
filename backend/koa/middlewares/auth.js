const jsonwebtoken = require("jsonwebtoken");
const secret = require("../config").jwtSecret;

module.exports = (auth) => {
  return async (ctx, next) => {
    if (!auth) return next();
    const { token = "" } = ctx.request.header;

    try {
      jsonwebtoken.verify(token, secret);
    } catch (e) {
      ctx.utils.throwError(10001, "无效的token");
    }
    await next();
  };
};
