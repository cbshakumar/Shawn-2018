'use strict';
const util = require('util');
const request = require('request');
const requestPostAsync = util.promisify(request.post);

async function register(user, password){
  let options = {
    url: 'http://localhost:3000/register',
    body: {
      user: user,
      password: password
    },
    json: true
  };

  try {
    let response = await requestPostAsync(options);
    console.log('%j', response.body);
  } catch(err){
    console.log(err);
  }
}

let args = process.argv.slice(2);
if(!args[0]){
  console.log('user argument missing');
  return;
}

if(!args[1]){
  console.log('password argument missing');
  return;
}

register(args[0], args[1]);

