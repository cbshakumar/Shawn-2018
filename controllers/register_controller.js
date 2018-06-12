'use strict';

class RegisterController{
  constructor(logger, userStorage){
    this._logger = logger;
    this._userStorage = userStorage;
  }

  async registerUser(req, res){
    //AJV validation
    await this._userStorage.add(req.body.user, req.body.password);
    res.statusCode = 200;
    res.json({ status: 'success' });
  }
}

module.exports = RegisterController;
