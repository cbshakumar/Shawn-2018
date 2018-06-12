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
router.use(bodyParser.json());

router.post('/register', async (req, res, next) => {
  safeExecute(async () => {
    let registerController = controllerFactory.getRegisterController();
    await registerController.registerUser(req, res);
  }, next);
});

router.post('/keys', (req, res, next) => {
});

router.use((err, req, res, next) => {
  logger.log('%s. Stack: %s', err, err.stack);
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
