'use strict';
const crypto = require('crypto');
const fs = require('fs');

let args = process.argv.slice(2);
let message = args[0];

const signer = crypto.createSign('sha512');
signer.update(message);
signer.end();

const privateKey = fs.readFileSync('./privkey.pem', 'utf-8');
const signature = signer.sign(privateKey)
console.log(signature.toString('hex'));
