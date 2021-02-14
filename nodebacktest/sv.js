const express = require('express');
const app = express();
const admin = require("firebase-admin");
const cors = require('cors');
const serviceAccount = require("./unify-tn-firebase-adminsdk-6i0rp-5c5b822f0b.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://unify-tn.firebaseio.com"
});
const db = admin.firestore()
let cacheCreatorMerch = {}
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.post('/initializeClaims', async(req, res) => {
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

app.post('/getClaims', async(req, res) => {
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

app.post('/createCreator', async(req, res) => {
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
            pro = admin.firestore().doc('/creators/all').set({
                [req.body.username]: true
            }, { merge: true })
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

app.post('/addOrder', async(req, res) => {
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


app.listen(3001, () => {
    console.log('Example app listening at http://localhost:3001')
})