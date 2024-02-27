const Sequelize = require('sequelize');
const config = require('../config');

async function init() {
  const mysql = config.database.mysql;
  const sequelize = new Sequelize(mysql.database, mysql.user, mysql.password, {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    timezone: '+08:00', //东八时区
  });

  const UserModel = require('./user')(sequelize, Sequelize.DataTypes);

  module.exports = {
    UserModel,
  };

  // await sequelize.sync({ force: true });

  await UserModel.sync({ force: true });
  console.log('所有模型均已成功同步.');
}

init();
