'use strict';
const crypto = require('crypto');
const fs = require('fs');

let args = process.argv.slice(2);
if(!args[0]){
  console.log('private pem key file argument is missing');
}

if(!args[1]){
  console.log('message argument is missing');
}

let pemFile = args[0];
let message = args[1];

const signer = crypto.createSign('sha512');
signer.update(message);
signer.end();

const privateKey = fs.readFileSync(pemFile, 'utf-8');
const signature = signer.sign(privateKey)
console.log(signature.toString('hex'));
