const UserService = require('../services/user');
const { Controller } = require('../decorators/controller');
const { Get } = require('../decorators/router');

@Controller({ prefix: '/user' })
class UserController {
  /**
   *
   * @param {import("@types/express").Request} req
   * @param {import("@types/express").Response} res
   */
  @Get('/all')
  static async getAll(req, res) {
    const users = await UserService.getAll();
    // res.send(users);
    res.send({ a: '11' });
  }
}

module.exports = UserController;
