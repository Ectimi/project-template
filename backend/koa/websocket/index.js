const WebSocketServer = require("ws").Server;

const row = [
  "Position",
  "Motor Status",
  "Motor Current",
  "Motor Speed",
  "DC Voltage",
  "1st Sen",
  "2nd Sen",
  "Motor Brake",
  "Run Enable",
  "Comm",
  "Hign Limit",
  "Low Limit",
];

const col = ["Lat", "Long", "Height", "iso", "Pitch", "Roll", "Col"];
const sendData = (ws) => {
  if (ws.readyState == 1) {
    let data = {};

    row.forEach((rowName) => {
      data[rowName] = {};
      col.forEach((colName) => {
        data[rowName][colName] = (Math.random() * 1000).toFixed(2);
      });
    });
    ws.send(JSON.stringify(data));
  }
};

class Socket {
  constructor(port = 8083) {
    this.port = port;
    this.wss = null;
    this.init();
  }

  init() {
    this.wss = new WebSocketServer({ port: this.port });

    this.wss.on("connection", (ws) => {
      console.log(`socket connected on ${this.port}`);
      let timer = setInterval(() => {
        sendData(ws);
      }, 3000);
      ws.on("message", function (message) {
        var msg = JSON.parse(message); //根据请求过来的数据来更新。
      });
      ws.on("close", function () {
        if (timer > 0) {
          //断开连接清楚定时器
          clearInterval(timer);
        }
      });
    });
  }
}

module.exports = Socket;
