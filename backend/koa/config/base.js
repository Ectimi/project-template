const pwd = process.cwd();

module.exports = {
  //  临时文件存放地址
  tempFilePath: `${pwd}/public/temp`,
  logConfig: {
    flag: true,
    outDir: `${pwd}/public/log`,
    level: "info",
  },
  jwtSecret:'test_secret'
};
