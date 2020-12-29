'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser);
app.get('/', (res, req) => {
  
    req.end("base");
});
app.get('/one', (res, req) => {
  
  req.end("yes");
});
app.post('/updatestate', (req, res) => {
    res.end('end')
  });

module.exports.handler = serverless(app);