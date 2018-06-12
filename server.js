'use strict';
const express = require('express');
const app = express();
const router = require('./routes/router.js');

let port = process.env.PORT || 3000;

app.use(router);
app.listen(port);
console.log('Server running and listening on port: %s', port);

