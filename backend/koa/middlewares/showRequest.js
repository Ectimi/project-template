module.exports = () => {
  return async (ctx, next) => {
    console.log("request url ==>", ctx.url);
    console.log("request method ==>", ctx.method);
    console.log(
      "request params ==>",
      ctx.method === "GET" ? ctx.request.query : ctx.request.body
    );
    console.log('************************************************************')
    await next();
  };
};
