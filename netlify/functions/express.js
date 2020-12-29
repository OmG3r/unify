'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const admin = require("firebase-admin");

const serviceAccount = require("./unify-tn-firebase-adminsdk-6i0rp-5c5b822f0b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://unify-tn.firebaseio.com"
});


app.use(bodyParser.json());
const router = express.Router();
router.get('/', (req, res) => {
    res.end('hello')
});
router.get('/another', (req, res) => {
    res.json({ route: req.originalUrl })
});
router.post('/', (req, res) => {
    res.json({ postBody: req.body })
});

router.post('/initializeClaims', async (req, res) => {

    let resp = await admin.auth().setCustomUserClaims(req.body.uid, req.body.claims)
    console.log(resp)
    res.end(JSON.stringify(resp))
})

router.post('/getClaims', async (req, res) => {
    let userRecord = await admin.auth().getUser(req.body.uid)
    console.log(userRecord)
    res.end(JSON.stringify(userRecord, null, 4))
})


app.use('/.netlify/functions/express', router);  // path must route to lambda

module.exports = app;
module.exports.handler = serverless(app);