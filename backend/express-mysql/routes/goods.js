const GoodsController = require('../controllers/goods');

class GoodsRoute {
  static async getAll(req, res) {
    const data = await GoodsController.getAll();
    res.send({ data });
  }
}

module.exports = GoodsRoute;