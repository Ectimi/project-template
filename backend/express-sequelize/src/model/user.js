/**
 * @typedef {import("sequelize").Sequelize} Sequelize
 * @typedef {import("sequelize").DataTypes} DataTypes
 */

/**
 *
 * @param {Sequelize} sequelie
 * @param {DataTypes} DataTypes
 */
module.exports = (sequelie, DataTypes) =>
  sequelie.define('User', {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    usename: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
  },{
    timestamps: true,
    tableName: 'user',
  });
