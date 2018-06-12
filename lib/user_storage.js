'use strict';
const util = require('util');
const crypto = require('crypto');
const pbkdf2 = util.promisify(crypto.pbkdf2);
const UserError = require('./errors/user_error');

class UserStorage{
  constructor(logger){
    this._logger = logger;
    this._storage = {};
  }

  async add(user, password){
    if(this._storage[user]){
      throw new UserError('User is already registered');
    }

    if(Object.keys(this._storage).length >= 10){
      throw new UserError('Server has reached user limit');
    }

    let salt = crypto.randomBytes(64).toString('base64');
    let hashedPassword = await this._hashPassword(password, salt);
    this._storage[user] = {
      salt: salt,
      hashedPassword: hashedPassword 
    };
  }

  async validate(user, password){
    let storedPassword = this._storage[user];
    if(!storedPassword){
      return false;
    }

    let hashedPassword = await this._hashPassword(password, storedPassword.salt)
    return storedPassword.hashedPassword === hashedPassword;
  }

  async _hashPassword(password, salt){
    let buffer =  await pbkdf2(password, salt, 100000, 512, 'sha512');
    return buffer.toString('hex');
  }
}

module.exports = UserStorage;
