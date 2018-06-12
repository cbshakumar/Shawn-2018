'use strict';
const ControllerFactory = require('../lib/factories/controller_factory');
const UserStorage = require('./user_storage');

class Container{
  constructor(logger){
    this._logger = logger;
    this._userStorage = new UserStorage(logger);
  }

  getControllerFactory(){
    return new ControllerFactory(this._logger, this._userStorage);
  }
}

module.exports = Container;
