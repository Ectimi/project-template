const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);

module.exports = {
  publicPath: "./",
  devServer:{
    host:'localhost'
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("@", resolve("./src"));
    config.plugin("html").tap((args) => {
      args[0].title = "多源密罐看板";
      return args;
    });
  },
};
