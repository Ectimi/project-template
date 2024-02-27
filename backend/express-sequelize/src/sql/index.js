const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.database.mysql);

const query = function (sql, values) {
  return new Promise(async (resolve, reject) => {
    try {
      const connection = await pool.getConnection();
      const [rows, fields] = await connection.execute(sql, values);
      connection.release();
      resolve(rows);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = query;
