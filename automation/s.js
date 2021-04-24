const admin = require("firebase-admin");
const serviceAccount = require("./unify-tn-firebase-adminsdk-6i0rp-5c5b822f0b.json");
const fs = require('fs')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://unify-tn.firebaseio.com"
});
const auth = admin.auth()
const db = admin.firestore()

const save = {}

const f = async() => {
    const listUsersResult = await auth.listUsers(1000)
    for (const userRecord of listUsersResult.users) {
        if (userRecord.customClaims == undefined || userRecord.customClaims.username == undefined) {
            continue
        }
        const payload = {
            username: userRecord.customClaims.username,
            persoName: userRecord.displayName,
            timestamp: {
                seconds: +new Date(userRecord.metadata.creationTime) / 1000,
                nanoseconds: 0
            },
            email: userRecord.email,
            phone: '-'
        }

        let resp = (await db.doc('/creators/' + userRecord.customClaims.username).get()).data()

        payload.storeEnabled = resp.storeEnabled
        payload.contacted = payload.storeEnabled


        save[payload.username] = payload

    }
    let data = JSON.stringify(save, null, 2);
    fs.writeFileSync('fire-admin.json', data);
}

//f()

const writeData = async() => {
    let rawdata = fs.readFileSync('fire-admin.json');
    let d = JSON.parse(rawdata);

    /*
    for (let [key, value] of Object.entries(d)) {
        value.timestamp.seconds = value.timestamp.seconds / 1000
        value.timestamp.nanoseconds = 0
    }
    */
    await db.doc('/admin/collections/creators/all').set(d)

}

//writeData()
/*

let data = JSON.stringify(userRecord, null, 2);
        fs.writeFileSync('fire-admin.json', data);
        */