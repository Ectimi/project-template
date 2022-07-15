const assert = require("assert");
const os = require('os');

function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}


const throwError = (code, message) => {
  const err = new Error(message);
  err.code = code;
  throw err;
};

module.exports = {
  assert,
  throwError,
  getIPAdress
};
