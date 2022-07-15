const jwt = require("jsonwebtoken");
const jwtsecret = "test_secret";

class Jwt {
  constructor(data) {
    this.data = data;
  }

  //生成token
  generateToken() {
    let data = this.data;
    let created = Math.floor(Date.now() / 1000);
    let token = jwt.sign(
      {
        data,
        exp: created + 60 * 60 * 24, //一天后过期
      },
      jwtsecret
    );

    return token;
  }

  //校验token
  verifyToken() {
    let token = this.data;
    let res = null;

    try {
      let result = jwt.verify(token, jwtsecret);
      let { exp = 0 } = result;
      let current = Math.floor(Date.now() / 1000);
      if (current <= exp) {
        res = result.data || {};
      }
    } catch (error) {
      res = "err";
    }
    return res;
  }
}

module.exports = Jwt;
