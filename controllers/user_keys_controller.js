'use strict';
const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true, verbose: true });

const saveKeyRequestSchema = require('../lib/schemas/save_key_request_schema');
const validateSaveKeyRequest = ajv.compile(saveKeyRequestSchema);
const verifyMessageRequestSchema = require('../lib/schemas/verify_message_request_schema');
const validateVerifyRequest = ajv.compile(verifyMessageRequestSchema);

class UserKeysController{
  constructor(logger, userStorage, userKeysStorage){
    this._logger = logger;
    this._userStorage = userStorage;
    this._userKeysStorage = userKeysStorage;
  }

  async saveKey(req, res){
    if(!validateSaveKeyRequest(req.body)){
      res.statusCode = 400;
      let error = validateSaveKeyRequest.errors[0];
      res.json({ error: `${error.dataPath} ${error.message}` });
      return;
    };

    /*A better way to do this is to issue user specific tokens which are validated
    * instead of passing user/password to each request. 
    * For the sake of implementation time, I went with a simple approach.
    * Token based authentication is faster(simple verification instead of running through password hashing to compare)
    * and a bit more secure(tokens can be short lived).
    */
    let isValidUser = await this._userStorage.validate(req.body.user, req.body.password);
    if(!isValidUser){
      res.statusCode = 401;
      res.json({ error: 'authorization failed' });
      return;
    }

    //if we have an existing user, just update his existing publicKey
    this._userKeysStorage.upsert(req.body.user, req.body.publicKey);

    res.statusCode = 200;
    res.json({ status: 'success' });
  }

  verifyMessage(req, res){
    if(!validateVerifyRequest(req.body)){
      res.statusCode = 400;
      let error = validateVerifyRequest.errors[0];
      res.json({ error: `${error.dataPath} ${error.message}` });
      return;
    };

    let valid = this._userKeysStorage.verifyMessage(req.body.user, req.body.signature, req.body.message);

    res.statusCode = 200;
    res.json({ valid: valid });
  }
}

module.exports = UserKeysController;
