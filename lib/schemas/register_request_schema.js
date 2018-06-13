'use strict';

module.exports = {
  "type": "object",
  "required": [ "user", "password" ],
  "properties": {
    "user": {
      "type": "string",
      "minLength": 1,
      "maxLength": 16
    },
    "password": {
      "type": "string",
      "minLength": 8,
      "maxLength": 16
    }
  }
};
