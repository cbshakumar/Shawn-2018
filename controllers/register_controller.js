'use strict';
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, verbose: true });
const registerRequestSchema = require('../lib/schemas/register_request_schema');
const validateRegisterRequest = ajv.compile(registerRequestSchema);

class RegisterController{
  constructor(logger, userStorage){
    this._logger = logger;
    this._userStorage = userStorage;
  }

  async registerUser(req, res){
    if(!validateRegisterRequest(req.body)){
      res.statusCode = 400;
      let error = validateRegisterRequest.errors[0];
      res.json({ error: `${error.dataPath} ${error.message}` });
      return;
    };

    await this._userStorage.add(req.body.user, req.body.password);
    res.statusCode = 200;
    res.json({ status: 'success' });
  }
}

module.exports = RegisterController;
