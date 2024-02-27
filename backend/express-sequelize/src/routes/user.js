const UserController = require('../controllers/user');

class UserRoute {
  static async getAll(req, res) {
    const data = await UserController.getAll();
    res.send({ data });
  }
}

module.exports = UserRoute;
