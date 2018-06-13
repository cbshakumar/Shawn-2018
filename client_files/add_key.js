'use strict';
const fs = require('fs');
const util = require('util');
const request = require('request');
const requestPostAsync = util.promisify(request.post);

async function add_key(user, password, key){
  let options = {
    url: 'http://localhost:3000/keys',
    body: {
      user: user,
      password: password,
      publicKey: key
    },
    json: true
  };

  try {
    let response = await requestPostAsync(options);
    debugger;
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

if(!args[2]){
  console.log('publicKey argument missing');
  return
}

let publicKey = fs.readFileSync(args[2], 'utf-8');
add_key(args[0], args[1], publicKey);
