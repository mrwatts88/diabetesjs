// Initialize firebase and get a reference to the database
const admin = require("firebase-admin");
const serviceAccount = require("./diabetesjs-firebase-adminsdk-7noq6-9cd93b41db.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://diabetesjs.firebaseio.com"
});

const db = admin.database();

function readAll(uid, responseCallback) {
    const ref = db.ref().child(`records/${uid}`);
    ref.once("value", snapshot => {
        const snapshotVal = snapshot.val();
        let data;
        if (!snapshotVal) {
            data = { bgl: {}, diet: {}, exercise: {}, medication: {} }
        } else {
            data = {
                bgl: !snapshotVal.bgl ? {} : snapshotVal.bgl,
                diet: !snapshotVal.diet ? {} : snapshotVal.diet,
                exercise: !snapshotVal.exercise ? {} : snapshotVal.exercise,
                medication: !snapshotVal.medication ? {} : snapshotVal.medication
            }
        }
        responseCallback(data);
    });
}

function readRange() {

}

module.exports.readAll = readAll;
module.exports.readRange = readRange;