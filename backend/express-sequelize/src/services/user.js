/**
 * @type {import("sequelize").ModelStatic<import("sequelize").Model}
 */
const UserModel = require('../model').UserModel;

class UserService {
  static async getAll() {
    const users = await UserModel.findAll();
    return users
  }
}

module.exports = UserService;
