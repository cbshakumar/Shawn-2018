'use strict';
const crypto = require('crypto');

class UserKeysStorage{
  constructor(logger){
    this._logger = logger;
    this._storage = {};
  }

  upsert(user, publicKey){
    this._storage[user] = publicKey;
  }

  verifyMessage(user, signature, message){
    let publicKey = this._storage[user];
    if(!publicKey){
      return false;
    }

    let verifier = crypto.createVerify('sha512');
    verifier.update(message);
    verifier.end();

    //convert incoming hex signature to a buffer because that is what the verifier API expects.
    return verifier.verify(publicKey, new Buffer(signature, 'hex'));
  }
}

module.exports = UserKeysStorage;
