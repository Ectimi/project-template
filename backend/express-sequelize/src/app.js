const express = require('express');
const cors = require('./middlewares/cors');
const UserController = require('./controllers/user');

class App {
  constructor({ port = 3000, middlewares = [], controllers = [] }) {
    this.middlewares = middlewares;
    this.controllers = controllers;
    this.app = express();
    this.applyMiddlewares();
    this.registerRoute();

    this.app.listen(port, () => {
      console.log(`Example app listening on port ${this.port}`);
    });
  }

  applyMiddlewares() {
    this.middlewares.map((middleware) => this.app.use(middleware));
  }

  registerRoute() {
    this.controllers.forEach((Controller) => {
      for (let k of Object.getOwnPropertyNames(Controller)) {
        const v = Controller[k];
        if (typeof v === 'function' && v.type === 'route') {
          this.app[v.method](Controller.prefix + v.path, v);
        }
      }
    });

    console.log('router register successful');
  }
}

new App({
  middlewares: [express.static('static'), cors],
  controllers: [UserController],
});
