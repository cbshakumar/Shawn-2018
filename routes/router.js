'use strict';
const express = require('express');
const router = express.Router();
const util = require('util');
const bodyParser = require('body-parser');
const UserError = require('../lib/errors/user_error');
const Container = require('../lib/container');

const logger = console;
const container = new Container(logger);
const controllerFactory = container.getControllerFactory();

router.use(bodyParser.urlencoded({ extended: false }));

//limit request size to 10kb. If it goes beyond this we will return an InternalServerError.
router.use(bodyParser.json({ limit: '10kb' }));

router.post('/register', (req, res, next) => {
  safeExecute(async () => {
    let registerController = controllerFactory.getRegisterController();
    await registerController.registerUser(req, res);
  }, next);
});

router.post('/keys', (req, res, next) => {
  safeExecute(async () => {
    let userKeysController = controllerFactory.getUserKeysController();
    await userKeysController.saveKey(req, res);
  }, next);
});

router.post('/verify', (req, res, next) => {
  safeExecute(async () => {
    let userKeysController = controllerFactory.getUserKeysController();
    await userKeysController.verifyMessage(req, res);
  }, next);
});

//handle errors and return an appropriate message
router.use((err, req, res, next) => {
  logger.log('%s. Stack: %s', err, err.stack);

  //UserError represents an Error that was caused due to a user doing something wrong.
  //The message for this error is meant to be returned as a friendly user error message.
  //Any other type of error should be caught and return a 500-InternalServerError. 
  //Under no circumstances should we show a stack trace in an API response. 
  if(err instanceof UserError){
    res.statusCode = 400;
    res.json({ error: err.message });
  } else {
    res.statusCode = 500;
    res.json({ error: 'InternalServerError' });
  }
  return next();
});

async function safeExecute(routeHandler, next){
  try{
    await routeHandler();
  } catch(err){
    return next(err);
  } finally {
    return next();
  }
}

module.exports =  router;
