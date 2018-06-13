'use strict';
const ControllerFactory = require('../lib/factories/controller_factory');
const UserStorage = require('./user_storage');
const UserKeysStorage = require('./user_keys_storage');

class Container{
  constructor(logger){
    this._logger = logger;
    this._userStorage = new UserStorage(logger);
    this._userKeysStorage  = new UserKeysStorage(logger);
  }

  getControllerFactory(){
    return new ControllerFactory(this._logger, this._userStorage, this._userKeysStorage);
  }
}

module.exports = Container;
