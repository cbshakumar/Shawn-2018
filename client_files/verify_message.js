const util = require('util');
const request = require('request');
const requestPostAsync = util.promisify(request.post);

async function verifyMessage(user, message, signature){
  let options = {
    url: 'http://localhost:3000/verify',
    body: {
      user: user,
      message: message,
      signature: signature
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
  console.log('message argument missing');
  return;
}

if(!args[2]){
  console.log('signature argument missing');
  return;
}

verifyMessage(args[0], args[1], args[2]);

