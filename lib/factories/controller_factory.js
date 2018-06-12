'use strict';
const RegisterController = require('../../controllers/register_controller');

class ControllerFactory{
  constructor(logger, userStorage){
    this._logger = logger;
    this._userStorage = userStorage;
  }

  getRegisterController(){
    return new RegisterController(this._logger, this._userStorage);
  }
}

module.exports = ControllerFactory;
