const GoodsRoute = require('../routes/goods');

const routes = [
  {
    method: 'get',
    path: '/goods/all',
    handler: GoodsRoute.getAll,
  },
];

module.exports = routes;