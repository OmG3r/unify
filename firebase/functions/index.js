const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore()

const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors({ origin: true }));


app.post('/initializeClaims', async (req, res) => {

    let resp = await admin.auth().setCustomUserClaims(req.body.uid, req.body.claims)
    console.log(resp)
    res.end(JSON.stringify(resp))
})

app.post('/getClaims', async (req, res) => {
    let userRecord = await admin.auth().getUser(req.body.uid)
    console.log(userRecord)
    res.end(JSON.stringify(userRecord, null, 4))
})

exports.backapi = functions.https.onRequest(app);