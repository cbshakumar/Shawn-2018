'use strict';
const RegisterController = require('../../controllers/register_controller');
const UserKeysController = require('../../controllers/user_keys_controller');

class ControllerFactory{
  constructor(logger, userStorage, userKeysStorage){
    this._logger = logger;
    this._userStorage = userStorage;
    this._userKeysStorage = userKeysStorage;
  }

  getRegisterController(){
    return new RegisterController(this._logger, this._userStorage);
  }

  getUserKeysController(){
    return new UserKeysController(this._logger, this._userStorage, this._userKeysStorage);
  }
}

module.exports = ControllerFactory;
