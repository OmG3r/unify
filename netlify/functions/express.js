'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = require("./unify-tn-firebase-adminsdk-6i0rp-5c5b822f0b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://unify-tn.firebaseio.com"
});
const db = admin.firestore()


app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors({origin: true, credentials: true}));
app.use(function (req, res, next) {
    res.type('application/json');
    next();
  });
app.options('*', cors({origin: true, credentials: true}))
const router = express.Router();
router.get('/', (req, res) => {
    res.end('hello')
});
router.get('/another', (req, res) => {
    res.json({ route: req.originalUrl })
});
router.post('/', (req, res) => {
    console.log(req.body)
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

router.post('/createCreator', async (req, res) => {
    console.log(req)
    console.log("rec")
    res.end(JSON.stringify({success: false, error: 'invalid request data', body: req.body}))
    return
    if (['email', 'password', 'username'].some((item) => req.body[item] == undefined)) {
        res.end(JSON.stringify({success: false, error: 'invalid request data', body: req.body}))
        return
    }

    let data = await admin.firestore().doc('/creators' + req.body.username).get()
    console.log(data)
    if (data.exists) {
        res.end(JSON.stringify({success: false, error: 'username already taken'}))
        return
    }

    admin.auth().createUser({
        email: req.body.email,
        emailVerified: false,
        password: req.body.password,
        disabled: false,
    })
    .then(async (userRecord) => {
        let promises = []
        let pro = admin.auth().setCustomUserClaims(userRecord.uid, {username: req.body.username})
        promises.push(pro)
        pro = admin.firestore().doc("/creators/" + username).set({
            username,
            email
        })
        promises.push(pro)
        await Promise.all(promises)
        res.end(JSON.stringify({success: true, msg: 'account created'}))
    })
    .catch((error) => {
        res.end(JSON.stringify({success: false, error}))
    })
})


app.use('/.netlify/functions/express', router);  // path must route to lambda
app.listen(8214, () => {
    console.log("listen")
})
module.exports = app;
module.exports.handler = serverless(app);