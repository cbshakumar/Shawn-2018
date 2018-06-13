module.exports = {
  "type": "object",
  "required": [ "user", "message", "signature" ],
  "properties": {
    "user": {
      "type": "string",
      "minLength": 1,
      "maxLength": 16
    },
    "message": {
      "type": "string",
      "minLength": 1,
      "maxLength": 2048
    },
    "signature": {
      "type": "string",
      "minLength": 1,
      "maxLength": 1024
    }
  }
};
