const fs = require("fs-extra");
const { nanoid } = require("nanoid");
const jsonwebtoken = require("jsonwebtoken");
const secret = require("../config").jwtSecret;
const account_data_path = "./mock/account.json";

// const expireTime = 60 * 60 * 24; //有效期一天
const expireTime = 50;
const test = async (ctx) => {
  ctx.body = "test token";
};

const login = async (ctx) => {
  const { username, password } = ctx.request.body;
  const account = fs.readJSONSync(account_data_path).data;

  for (let i = 0; i < account.length; i++) {
    if (account[i].username === username) {
      if (account[i].password === password) {
        const token = jsonwebtoken.sign(
          {
            data: { username, password },
            exp: Math.floor(Date.now() / 1000) + expireTime, 
          },
          secret
        );
        ctx.body = {
          msg: "登陆成功",
          token,
        };
        return;
      } else {
        ctx.utils.throwError(10002, "密码不正确");
        return;
      }
    }
  }
  ctx.utils.throwError(10003, "账号不存在");
};

const register = async (ctx) => {
  const { username, password } = ctx.request.body;
  const account = fs.readJSONSync(account_data_path).data;
  for (let i = 0; i < account.length; i++) {
    if (account[i].username === username) {
      ctx.body = "账号已存在";
      return;
    }
  }
  fs.writeJsonSync(
    account_data_path,
    {
      name: "account",
      data: [
        ...account,
        {
          id: nanoid(),
          username,
          password,
        },
      ],
    },
    {
      spaces: "\t",
    }
  );
  ctx.body = "注册成功";
};

const alterPassword = async (ctx) => {
  const { username, originPassword, newPassword } = ctx.request.body;
  const account = fs.readJSONSync(account_data_path).data;

  for (let i = 0; i < account.length; i++) {
    if (account[i].username === username) {
      if (account[i].password === originPassword) {
        account[i].password = newPassword;
        fs.writeJsonSync(
          account_data_path,
          {
            name: "account",
            data: [...account],
          },
          {
            spaces: "\t",
          }
        );
        ctx.body = "修改成功";
        return;
      } else {
        ctx.utils.throwError(10003, "原密码不正确");
        return;
      }
    }
  }

  ctx.utils.throwError(10003, "账号不存在");
};

const refreshToken = async (ctx) => {
  const { token = "" } = ctx.request.header;

  try {
    const res = jsonwebtoken.verify(token, secret);
    const newToken = jsonwebtoken.sign(
      {
        data: res.data,
        exp: Math.floor(Date.now() / 1000) + expireTime, 
      },
      secret
    );
    ctx.body = {
      msg: "刷新token成功",
      token: newToken,
    };
  } catch (e) {
    ctx.utils.throwError(10001, "无效的token");
  }
};

module.exports = {
  test,
  login,
  register,
  alterPassword,
  refreshToken,
};
