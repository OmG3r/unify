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
app.use(cors({ origin: true, credentials: true }));
app.use(function(req, res, next) {
    res.type('application/json');
    next();
});
app.options('*', cors({ origin: true, credentials: true }))
app.post('*', cors({ origin: true, credentials: true }))
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

router.post('/initializeClaims', async(req, res) => {

    let resp = await admin.auth().setCustomUserClaims(req.body.uid, req.body.claims)
    console.log(resp)
    res.end(JSON.stringify(resp))
})

router.post('/getClaims', async(req, res) => {
    let userRecord = await admin.auth().getUser(req.body.uid)
    console.log(userRecord)
    res.end(JSON.stringify(userRecord, null, 4))
})

router.post('/createCreator', async(req, res) => {
    if (['email', 'password', 'username'].some((item) => req.body[item] == undefined)) {
        res.end(JSON.stringify({ success: false, msg: 'invalid request data', body: req.body }))
        return
    }

    let data = await admin.firestore().doc('/creators/' + req.body.username).get()
    console.log(data)
    if (data.exists) {
        res.end(JSON.stringify({ success: false, error: { message: 'username already taken' } }))
        return
    }

    admin.auth().createUser({
            email: req.body.email,
            emailVerified: false,
            password: req.body.password,
            disabled: false,
        })
        .then(async(userRecord) => {
            let promises = []
            let pro = admin.auth().setCustomUserClaims(userRecord.uid, { username: req.body.username })
            promises.push(pro)
            pro = admin.firestore().doc("/creators/" + req.body.username).set({
                username: req.body.username,
            })
            promises.push(pro)
            await Promise.all(promises)
            res.end(JSON.stringify({
                success: true,
                msg: 'account created',
                authToken: await admin
                    .auth()
                    .createCustomToken(userRecord.uid)
            }))
        })
        .catch((xerror) => {
            res.end(JSON.stringify({ success: false, msg: 'firebase creation error', error: { xerror } }))
        })
})

router.post('/addOrder', async(req, res) => {
    let data = req.body
    Object.entries(data).forEach(([key, value]) => {
        try {
            data[key] = JSON.parse(value)
        } catch {

        }
    })
    let gerror = false
    let userData = {}
    await admin.auth().verifyIdToken(data.token)
        .then((decodedToken) => {
            userData = decodedToken
            const uid = decodedToken.uid;
            console.log(decodedToken)
                // ...
        })
        .catch((error) => {
            // Handle error
            gerror = true

        });
    if (gerror) {
        res.send(JSON.stringify({ success: false, error: 'auth/invalid-auth-token', msg: 'invalid token, try loggin in' }))
        return
    }
    if (userData.email_verified == false) {
        res.send(JSON.stringify({ success: false, error: 'auth/unverified-email', msg: 'email not verified, verify your email' }))
        return
    }
    if (userData.phone_number == undefined || userData.phone_number == null || userData.phone_number == '') {
        res.send(JSON.stringify({ success: false, error: 'auth/no-phone-number', msg: 'no phone number,please add a phone number to your account' }))
        return
    }

    data.info = {
        ...data.info,
        phoneNumber: userData.phone_number
    }
    let xdata = {
        ...data.info,
        ...data.cart,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }
    const batch = db.batch();
    batch.set(db.collection('orders').doc(data.cart.cartID), xdata)
        //db.collection('orders').doc(data.cart.cartID).set(xdata);
        /*db.collection('orders').doc('all').set({
            [data.cartID]: xdata
        }, { merge: true })*/
    batch.set(db.collection('orders').doc('all'), {
            [xdata.cartID]: xdata
        }, { merge: true })
        /*db.collection('users').doc(userData.uid).set({
            ['orders.' + xdata.cardID]: xdata
        }, { merge: true })*/
    batch.set(db.collection('users').doc(userData.uid), {
        ['orders']: {
            [xdata.cartID]: xdata
        }
    }, { merge: true })
    let creatorOrders = {}
    Object.entries(data.cart.items).forEach(([key, value]) => {
        creatorOrders[value.creator] = creatorOrders[value.creator] || {...data.info, cartID: xdata.cartID, timestamp: xdata.timestamp, items: {} }
        creatorOrders[value.creator].items[key] = value
    })
    Object.entries(creatorOrders).forEach(([creator, order]) => {
        batch.set(db.collection('creators').doc(creator), {
            ['orders']: {
                [xdata.cartID]: order
            }

        }, { merge: true })
    })
    await batch.commit()
    res.send(JSON.stringify({ success: true }))
});


app.use('/.netlify/functions/express', router); // path must route to lambda
/*app.listen(8222, () => {
    console.log("listened")
})*/
module.exports = app;
module.exports.handler = serverless(app);