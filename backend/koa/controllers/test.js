const list = async (ctx) => {
  ctx.body = "get user list";
};

const login = async (ctx) => {
  console.log("params==>", ctx.request.body);
  ctx.body = "login";
}

const addInfo = async (ctx) => {
  console.log("params==>", ctx.request.body);
  ctx.body = "add user info";
};

module.exports = {
  list,
  login,
  addInfo
};
