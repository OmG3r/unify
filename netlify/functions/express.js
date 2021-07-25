'use strict';
const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const admin = require("firebase-admin");

const serviceAccount = /* must include actual file, manual deploys do not add fiel */
 //require("./unify-tn-firebase-adminsdk-gimsz-53afea4adf.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://unify-tn.firebaseio.com"
});
const db = admin.firestore()
let cacheCreatorMerch = {}

app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
//app.options('*', cors({ origin: "*", credentials: true }))
//app.post('*', cors({ origin: "*", credentials: true }))
const router = express.Router();
router.get('/', (req, res) => {
    res.end('hello32')
});
router.get('/another', (req, res) => {
    res.json({ route: req.originalUrl })
});
router.post('/', (req, res) => {
    console.log(req.body)
    res.json({ postBody: req.body })
});

router.post('/initializeClaims', async(req, res) => {
    let template = {
        target: 'text',
        operation: 'add/overwrite',
        claims: {},
        issuerToken: ''
    }
    let data = req.body
    let theError = undefined
    let userData = undefined
    if (data.target.includes('@')) {
        // email
        userData = await admin.auth().getUserByEmail(data.target).catch((error) => {
            console.log(error)
            theError = error
        })
    } else {
        // uid
        userData = await admin.auth().getUser(data.target).catch((error) => {
            console.log(error)
            theError = error
        })
    }
    if (theError) {
        res.end(JSON.stringify({ success: false, ...theError }))
        return
    }

    let writeClaims = {}
    if (data.operation == "add") {
        if (userData.customClaims) {
            writeClaims = {
                ...userData.customClaims,
                ...data.claims
            }
        } else {
            writeClaims = data.claims
        }

    } else if (data.operation == "overwrite") {
        writeClaims = data.claims
    }
    let resp = await admin.auth().setCustomUserClaims(userData.uid, writeClaims)
    console.log(writeClaims)
    res.end(JSON.stringify(resp))
})

router.post('/getClaims', async(req, res) => {
    let data = req.body
    let theError = undefined
    let userData = undefined
    if (data.target.includes('@')) {
        // email
        userData = await admin.auth().getUserByEmail(data.target).catch((error) => {
            console.log(error)
            theError = error
        })
    } else {
        // uid
        userData = await admin.auth().getUser(data.target).catch((error) => {
            console.log(error)
            theError = error
        })
    }


    console.log(userData)
    res.end(JSON.stringify(userData, null, 4))
})

router.post('/createCreator', async(req, res) => {
    if (['email', 'password', 'username', 'persoName', 'phone'].some((item) => req.body[item] == undefined)) {
        res.end(JSON.stringify({ success: false, error: { message: 'invalid request data' }, body: req.body }))
        return
    }

    if (req.body.username.match(/^[a-zA-Z0-9]+$/) == null) {
        res.end(JSON.stringify({ success: false, error: { message: 'invalid username' }, body: req.body }))
        return
    }

    function isNumeric(value) {
        return /^\d+$/.test(value);
    }
    let tphone = req.body.phone.replace("+216", "").replace(" ", "")
    if (tphone.length != 8 || !isNumeric(tphone)) {
        res.end(JSON.stringify({ success: false, error: { message: "Phone number is invalid" }, body: req.body }))
        return
    }

    req.body.username = req.body.username.toLowerCase()
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
            phoneNumber: '+216' + tphone,
            displayName: req.body.persoName
        })
        .then(async(userRecord) => {
            let promises = []
            let pro = admin.auth().setCustomUserClaims(userRecord.uid, { username: req.body.username })
            promises.push(pro)
            pro = admin.firestore().doc("/creators/" + req.body.username).set({
                username: req.body.username,
                storeEnabled: false
            })
            promises.push(pro)
            pro = admin.firestore().doc('admin/collections/creators/all').set({
                [req.body.username]: {
                    email: req.body.email,
                    persoName: req.body.persoName,
                    storeEnabled: false,
                    phoneNumber: req.body.phone,
                    timestamp: admin.firestore.FieldValue.serverTimestamp()
                }
            }, { merge: true })
            promises.push(pro)
            pro = admin.firestore().doc('/admin/collections/creators/' + req.body.username).set({
                email: req.body.email,
                persoName: req.body.persoName,
                storeEnabled: false,
                phoneNumber: req.body.phone,
                timestamp: admin.firestore.FieldValue.serverTimestamp()
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
            res.end(JSON.stringify({ success: false, msg: 'firebase creation error', error: xerror }))
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
        phoneNumber: userData.phone_number,
        useruid: userData.uid
    }
    let xdata = {
        ...data.info,
        ...data.cart,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    }

    let creatorOrders = {}
    for (let [key, value] of Object.entries(data.cart.items)) {
        /* trustfully set the price and profit of each item at this instance */
        if (cacheCreatorMerch[value.creator] == undefined) {
            cacheCreatorMerch[value.creator] = (await db.doc('creators/' + value.creator + "/merch/all").get()).data()
        }

        value.price = cacheCreatorMerch[value.creator][value.id].price
        value.profit = cacheCreatorMerch[value.creator][value.id].profit
        creatorOrders[value.creator] = creatorOrders[value.creator] || {...data.info, cartID: xdata.cartID, timestamp: xdata.timestamp, items: {} }
        creatorOrders[value.creator].items[key] = value
    }





    const batch = db.batch();


    batch.set(db.doc('admin/collections/orders/' + data.cart.cartID), xdata)
        //db.collection('orders').doc(data.cart.cartID).set(xdata);
        /*db.collection('orders').doc('all').set({
            [data.cartID]: xdata
        }, { merge: true })*/
    batch.set(db.doc('admin/collections/orders/all'), {
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

    Object.entries(creatorOrders).forEach(([creator, order]) => {
        batch.set(db.doc('creators/' + creator + '/orders/all'), {
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