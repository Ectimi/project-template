const query = require('../sql');

class GoodsController{
    static async getAll(){
        const goods = await query('select * from goods');
        return goods;
    }
}

module.exports = GoodsController