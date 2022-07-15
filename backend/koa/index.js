const Koa = require("koa");
const compose = require("koa-compose");

const MD = require("./middlewares/");
const config = require("./config");
const utils = require("./common/utils");
const Socket = require('./websocket')

const app = new Koa();

const port = "8082";
const host = "localhost";

app.context.config = config;
app.context.utils = utils;

new Socket()

//允许跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set("Access-Control-Allow-Methods", "PUT,DELETE,POST,GET");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild,X-Litemall-Admin-Token,token"
  );
  ctx.set("Access-Control-Allow-Credentials", true);
  ctx.set("Access-Control-Max-Age", 3600 * 24);

  await next();
});

app.use(compose(MD));

app.on("error", (err, ctx) => {
  if (ctx) {
    ctx.body = {
      code: 9999,
      message: `程序运行时报错：${err.message}`,
    };
  }
});

app.listen(port, host, () => {
  console.log(`API server listening on http://${host}:${port}`);
});
