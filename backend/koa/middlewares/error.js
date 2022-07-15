const statusCode = require("../common/statusCode");

const error = () => {
  return async (ctx, next) => {
    try {
      await next();
      if (ctx.status === 200) {
        ctx.res.success();
      } else {
        let msg = statusCode[ctx.status].name || "未知错误";
        ctx.res.fail({ code: ctx.status, msg });
      }
    } catch (err) {
      if (err.code) {
        // 自己主动抛出的错误
        ctx.res.fail({ code: err.code, msg: err.message });
      } else {
        // 程序运行时的错误
        ctx.app.emit("error", err, ctx);
      }
    }
  };
};

module.exports = error;
