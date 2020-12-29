const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

function updateDatabase(data) {
  return newValue;
}

app.use(bodyParser);
app.get('/', (res, req) => {
  
    req.send("base");
  });
app.get('/one', (res, req) => {
  
  req.send("yes");
});

module.exports.handler = serverless(app);